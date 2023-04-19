"""Server for art app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from jinja2 import StrictUndefined
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
        
        return redirect("/user")
    
    else:
        error = "Incorrect login details, try again or click signup to create an ARTwrks account"
        return render_template("homepage.html", error=error)


@app.route("/logout")
def logout():
    """Logout user."""

    session.clear()
    return redirect("/")


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
    
    return redirect("/user")

   
@app.route("/user")
def user_page():
    """View user page"""

    logged_in = checkIsLoggedIn
    if logged_in() == False:
        return redirect("/")

    return render_template("user.html")


### routes that return data to fetch requests ###

@app.route("/api/user-portfolio-titles")
def get_user_portfolio_titles():
    """Return user portfolio titles"""

    portfolios = crud_p.get_all_portfolios_by_user_id(session['user_id'])
    titles_ids: list = []

    # Check if user no portfolios
    if not portfolios:
        return {'status' : 'none found'}

    # Append the portfolio titles 
    for portfolio in portfolios:
        titles_ids.append([portfolio.p_title.capitalize(), 
                       portfolio.portfolio_id]) 

    return {'status' : 'success',
            'message': titles_ids
            }



@app.route("/api/save-artwork", methods=['POST'])
def save_new_artwork():
    """Create new artwork for user and commit to database"""
    
    ###Split up into helper functions####

    # Get inputs for title and portfolio from save form
    a_title = request.json.get("artwork-title")
    existing_portfolio_id = request.json.get("portfolio-id")
    new_portfolio_title = request.json.get("new-portfolio-title")

    
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
    portfolio_id = get_new_portfolio_id() if existing_portfolio_id == 'options' else existing_portfolio_id

    #save image to Amazon S3
    # get file path to amazon S3
    file_path = 'fake-path-just-testing'
   

    new_artwork = crud_a.create_artwork(portfolio_id=portfolio_id, 
                                        a_title=a_title,
                                        file_path=file_path)
    db.session.add(new_artwork)
    db.session.commit()

    msg = (f"Artwork saved: {new_artwork.a_title}")
    return jsonify({ 'status': 'success', 'message': msg })






if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)