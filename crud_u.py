"""CRUD operations for User table in artworks database."""

from model import db, connect_to_db, User


def create_user(username, email, password):
    """Create and return a new user."""

    user = User(username=username, 
                email=email, 
                password=password)
    return user


def get_user_by_id(user_id):
    """Return a user by primary key."""

    return User.query.get(user_id)


def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()



if __name__ == "__main__":
    from server import app

    connect_to_db(app, echo=True)