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


# # will be ceated in DB when click save, ***required to add to a portfolio***
# @app.route("/api/save-artwork")
# def new_artwork():
#     """Create new artwork for user"""

#     #get infputs for title and portfolio from modal form(still to be created)

#     artwork = crud_a.create_artwork()
#     db.session.add(artwork)
#     db.session.commit()

#     #save to session 
#     session['artwork_id'] = artwork.artwork_id

#     flash(f"Artwork saved artwork_id: {session['artwork_id']}")#just for testing
    
#     return jsonify()###complete function after build related pieces






if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)