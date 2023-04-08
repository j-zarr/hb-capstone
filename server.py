"""Server for art app."""

from flask import (Flask, render_template, request, flash, session, redirect, url_for)
from jinja2 import StrictUndefined
from model import connect_to_db, db
import crud


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


### routes that return html templates ###


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("homepage.html")


@app.route("/login")
def login():
    """View user login form."""

    return render_template("login.html", error=None) #Error=None on initial template render


@app.route("/validate-user", methods=['POST'])
def login_user():
    """Validate user login info"""

    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)

    if user and user.password == password:
        
        #store user info in session
        session['user_id'] = user.user_id
        session['username'] = user.username
        session['logged_in'] = True
        
        return redirect("/user")
    
    else:
        error = "Incorrect login details, try again or click signup to create an ARTwrks account"
        return render_template("login.html", error=error)


@app.route("/logout")
def logout():

    session['user_id'] = None
    session['username'] = None
    session['logged_in'] = False

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
   
    new_user = crud.create_user(username=username,
                                email=email, 
                                password=password)
    db.session.add(new_user)
    db.session.commit()

    user = crud.get_user_by_email(email)

    #login new user and store user info in session
    session['user_id'] = user.user_id
    session['username'] = user.username
    session['logged_in'] = True
    
    return redirect("/user")

   
@app.route("/user")
def user_page():
    """View user page"""

    return render_template("user.html")


### routes that return json/text/flash messages to ajax fetch requests ###


@app.route("/new-artwork")
def new_artwork():
    """Create new artwork for user"""

    aw = crud.create_artwork()
    db.session.add(aw)
    db.session.commit()

    #save to session 
    
    return "<h1>placeholder</h1>"





if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)