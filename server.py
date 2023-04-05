"""Server for art app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from jinja2 import StrictUndefined
from model import connect_to_db, db
import crud


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("homepage.html")


@app.route("/login")
def login():
    """View user login-form."""

    #if user exists in db, render user profile template
    #else redirect to create new user 

    #need to store user info in session so can only access routes if logged-in
    #and to have access to the user_id

   # return render_template("user.html")


@app.route("/create-user-form")
def create_account():
    """View create-user-form."""

    return render_template("create-user-form.html")


@app.route("/create-user", methods=['POST'])
def create_user():
    """Commit new user to database."""


    username = request.form.get("username")
    email = request.form.get("email")
    password = request.form.get("password")
   
    new_user = crud.create_user(username=username,
                                email=email, 
                                password=password)
    db.session.add(new_user)
    db.session.commit()

    print('*'*20, {crud.get_user_by_email(email)})

    return redirect("/user")
    #success message
    #need to log them in automatiaclly after creates account
    
   # return redirect('/user/<user>') or render template '/user.html'


@app.route("/user")
def user_page():
    """View user page"""

    return render_template("user.html")


@app.route("/new-artwork")
def new_artwork():
    """Create new artwork for user"""

    aw = crud.create_artwork()
    db.session.add(aw)
    db.session.commit()

    #save to session 
    
    return "<h1>placeholder</h1>"

#create a route to update artwork details: title, portfolio, path


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)