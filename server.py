"""Server for art app."""

from flask import (Flask, render_template, request, session, redirect,url_for ,jsonify)
from jinja2 import StrictUndefined
import boto3
import os
import uuid
import base64
from model import connect_to_db, db
import crud_u, crud_p, crud_a 


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined




# helper function to not allow user to navigate to user page in url wwithout logging in 
def checkIsLoggedIn():
    if session.get('user_id', 0) == 0:
        return False


### routes that return html templates ###

@app.route("/")
def homepage():
    """View homepage."""

    error = None #set error to none on initial page load

    return render_template("homepage.html", error=error)


@app.route("/login", methods=['POST'])
def login_user():
    """Validate user login info"""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud_u.get_user_by_email(email)

    if user and user.password == password:

        #store user info in session
        session['user_id'] = user.user_id
        session['username'] = user.username
        session['logged_in'] = True
        
        return redirect(url_for('user_page'))
    
    else:
        error = "Incorrect login details, try again or click signup to create an ARTwrks account"
        return render_template("homepage.html", error=error)


@app.route("/logout")
def logout():
    """Logout user."""

    session.clear()
    return redirect(url_for('homepage'))


@app.route("/signup")
def create_account():
    """View signup form."""

    return render_template("signup.html")


@app.route("/create-user", methods=['POST'])
def create_user():
    """Commit new user to database."""

    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
   
    new_user = crud_u.create_user(username=username,
                                email=email, 
                                password=password)
    db.session.add(new_user)
    db.session.commit()


    #login new user and store user info in session
    session['user_id'] = new_user.user_id
    session['username'] = new_user.username
    session['logged_in'] = True
    
    return redirect(url_for('user_page'))

   
@app.route("/user")
def user_page():
    """View user page."""

    logged_in = checkIsLoggedIn
    if logged_in() == False:
        return redirect(url_for('homepage'))

    return render_template("user.html")


### routes that return data to fetch requests ###

@app.route("/api/user-portfolio-titles")
def get_user_portfolio_titles():
    """Return user portfolio titles and corresponding ids."""

    portfolios = crud_p.get_all_portfolios_by_user_id(session['user_id'])
    titles_ids: list = []

    # Check if user has no portfolios
    if not portfolios:
        return {'status' : 'none found'}

    # Append each portfolio [title and id]
    for portfolio in portfolios:
        titles_ids.append([portfolio.p_title, 
                       portfolio.portfolio_id]) 

    return {'status' : 'success',
            'message': titles_ids
            }



@app.route("/api/save-artwork", methods=['POST'])
def save_new_artwork():
    """Create new artwork for user and commit to database."""
    
    ###### TO DO: ######################
    ###Split up into helper functions####
    ####################################
    
    # Get inputs for title and portfolio from save form
    a_title = request.json.get("artwork-title")
    existing_portfolio_id = request.json.get("portfolio-id")
    existing_portfolio_title = request.json.get("portfolio-title")
    new_portfolio_title = request.json.get("new-portfolio-title")
    base64_artwork_str = request.json.get('artwork-dataURL').split('base64,')[1] #remove prefix


    def get_new_portfolio_id():
         # Create the new_portfolio
        new_portfolio = crud_p.create_portfolio(
            user_id=session['user_id'], p_title=new_portfolio_title)
        db.session.add(new_portfolio)
        db.session.commit()

        # Get the portfolio_if of the new portfolio
        created_portfolio = crud_p.get_portfolio_by_user_id_p_title(
            user_id=session['user_id'], p_title=new_portfolio_title)
        return created_portfolio.portfolio_id
    
    # Get the portfolio relevant portfolio id based on user selection 
    # (id of existing portfolio or the newly created portfolio)
    portfolio_id = get_new_portfolio_id() if not existing_portfolio_id else existing_portfolio_id
    portfolio_title = new_portfolio_title if not existing_portfolio_id else existing_portfolio_title
      
    # Set up key and accessibility to S3 bucket
    S3_KEY_ID = os.environ.get("S3_KEY_ID")
    S3_SECRET_KEY = os.environ.get("S3_SECRET_KEY")

    boto3.set_stream_logger('botocore', level='DEBUG')
   
    s3 = boto3.resource('s3', 
                        aws_access_key_id=S3_KEY_ID,  
                        aws_secret_access_key=S3_SECRET_KEY
                        )
    
    artwork_bucket = s3.Bucket(name='artworks-images')

    # Create a unique filename for the artwork
    # Replace any spaces in user specified artwork title with "-" to store in S3
    file_name = f"{uuid.uuid4().hex}-{a_title.replace(' ', '-')}.png"


    # Save artwork image to Amazon S3
    # Key = filename,  prepend {user_id/} to create "folder" objects for each user's artworks
    # Body = the file sending, convert to image file from dataURL string
    artwork_bucket.Object(file_name).put(Body=base64.b64decode(base64_artwork_str), Key=f"{session['user_id']}/{file_name}")
    
    file_path = f"https://{artwork_bucket.name}.s3.amazonwas.com/{session['user_id']}/{file_name}"
   
    new_artwork = crud_a.create_artwork(portfolio_id=portfolio_id, 
                                        a_title=a_title,
                                        file_path=file_path)
    db.session.add(new_artwork)
    db.session.commit()

    msg = (f"{new_artwork.a_title} saved to portfolio:{portfolio_title}!")
    return jsonify({ 'status': 'success', 'message': msg })


@app.route('/api/delete-porfolio/<pId>')
def delete_portfolio(pId):
    """Commit deletion of portfolio to database."""

    crud_p.delete_portfolio_by_id(int(pId))
    db.session.commit()

    return {"status": "success"}

    
@app.route('/api/update-portfolio-title/<pId>', methods=['POST'])
def update_portfolio_title(pId):
    """Commit updated portfolio title to database."""

    title = request.json.get('title')

    crud_p.update_portfolio_title(portfolio_id=int(pId),
                                                new_title=title)
    db.session.commit()
    return {'status' : 'success'}


@app.route('/api/search-porfolios',  methods=['POST'])
def get_portfolio_search_results():
    """Return list of matched portfolio titles."""

    search_param = request.json.get('searchParam')

    portfolios = crud_p.get_portfolios_by_search_param(
        user_id=session['user_id'], search_param=search_param)
    titles_ids: list = []

    # Append each portfolio [title and id]
    for portfolio in portfolios:
        titles_ids.append([portfolio.p_title, 
                       portfolio.portfolio_id]) 

    return {'status' : 'success',
            'message': titles_ids
            }


@app.route('/api/get-user-artworks')
def get_all_user_artworks():
    """Return list of all user artworks."""

    artworks = crud_a.get_all_artworks_by_user_id(session['user_id'])
    all_artworks: list = []

    # Check if user has noartworks
    if not artworks:
        return {'status' : 'none found'}

    # Append each portfolio [title and id]
    for artwork in artworks:
        all_artworks.append([ artwork.a_title,
                             artwork.artwork_id,
                             artwork.portfolio_id,
                             artwork.file_path
                            ]) 

    return {'status' : 'success',
            'message': all_artworks
            }


@app.route('/api/get-portfolio-artworks/<pId>')
def get_portfolio_artworks(pId):
    """Return list of all artworks from one portfolio."""

    artworks = crud_a.get_all_artworks_by_portfolio_id(portfolio_id=pId)

    all_artworks: list = []

    # Check if user has noartworks
    if not artworks:
        return {'status' : 'none found'}

    # Append each portfolio [title and id]
    for artwork in artworks:
        all_artworks.append([ artwork.a_title,
                             artwork.artwork_id,
                             artwork.portfolio_id,
                             artwork.file_path
                            ]) 

    return {'status' : 'success',
            'message': all_artworks
            }


@app.route('/api/delete-artwork/<aId>')
def delete_artwork(aId):
     """Commit deletion of artwork to database."""

     crud_a.delete_artwork_by_id(int(aId))
     db.session.commit()

     return {"status": "success"}


@app.route('/api/update-artwork-title/<aId>', methods=['POST'])
def update_artwork_title(aId):
    """ Commit updated artwork title to database."""
    
    title = request.json.get('title')

    crud_a.update_artwork_by_id(artwork_id=aId ,new_title=title)
                                                
    db.session.commit()
    return {'status' : 'success'}


@app.route('/api/update-artwork-portfolio-id/<aId>', methods=['POST'])
def update_artwork_portfolio(aId):
    """Commit updated artwork portfolio to database."""
    
    pId = request.json.get('pId')
    crud_a.update_artwork_by_id(artwork_id=aId, portfolio_id=pId)
                                                
    db.session.commit()
    return {'status' : 'success'}


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)