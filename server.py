"""Server for art app."""

from flask import (Flask, render_template, request, flash, session, redirect, jsonify)
from jinja2 import StrictUndefined
from model import connect_to_db, db
import crud_u, crud_p, crud_a 


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


# helper function to not allow user to navigate to user page in url wwithiout logging in 
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

@app.route("/api/-user-portfolio-titles")
def get_user_portfolio_titles():
    """Return user portfolio titles"""

    portfolios = crud_p.get_all_portfolios_by_user_id(session['user_id'])
    return jsonify(portfolios)


# # will be ceated in DB when click save, ***required to add to a portfolio***
@app.route("/api/save-artwork", methods=['POST'])
def save_new_artwork():
    """Create new artwork for user and commit to database"""

   ###Split up into helper functions

    # Get inputs for title and portfolio from save form
    a_title = request.form.get("arwork-title")
    existing_portfolio = request.form.get("portfolio-title")
    new_portfolio = request.form.get("new-portfoilio-title")

    # Get either existing portfolio title or newly created portfolio title
    p_title =  new_portfolio if new_portfolio else existing_portfolio

    
    new_portfolio_to_add = crud_p.create_portfolio(session['user_id'], p_title)
    db.session.add(new_portfolio_to_add)
    db.session.commit()

    #save image to Amazon S3
    # get file path to amazon S3
    file_path = 'fake-path-just-testing'

    new_artwork = crud_a.create_artwork(portfolio_title=p_title, 
                                          a_title= a_title,
                                          file_path=file_path)
    db.session.add(new_artwork)
    db.session.commit()

    flash(f"Artwork saved artwork_id: {session['artwork_id']}")#just for testing
    message = f"Artwork saved artwork_id: {session['artwork_id']}"
    return message






if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)