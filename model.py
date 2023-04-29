"""Models for ARTwrks app."""

from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    """A User."""

    __tablename__ = "users"

    user_id  = db.Column(db.Integer, 
                         autoincrement=True, 
                         primary_key=True)
    
    username = db.Column(db.String(25),
                         nullable=False)
    
    email = db.Column(db.String(25), 
                      unique=True, 
                      nullable=False) 
    
    password = db.Column(db.Text, 
                         nullable=False)

    # one user to many portfolios
    portfolios = db.relationship("Portfolio", 
                                 back_populates="user")

    def __repr__(self):
        return f"<User user_id={self.user_id} email={self.email}>"
    
    
class Portfolio(db.Model):
    """A User Portfolio."""

    __tablename__ = "portfolios"

    portfolio_id = db.Column(db.Integer, 
                             autoincrement=True, 
                             primary_key=True) 
    
    p_title = db.Column(db.String(75),
                        unique=True,
                        nullable=False)
    
    user_id = db.Column(db.Integer, 
                        db.ForeignKey("users.user_id"),
                        nullable=False)

    user = db.relationship("User", 
                           back_populates="portfolios")

    # one portfolio to many artworks
    artworks = db.relationship("Artwork", 
                               back_populates="portfolio",
                               # delete related artworks if portfolio deleted
                               cascade = "all, delete, delete-orphan") 

    def __repr__(self):
        return f"<Portfolio portfolio_id={self.portfolio_id} p_title={self.p_title}>"
    

class Artwork(db.Model):
    """A completed user canvas."""

    __tablename__ = "artworks"

    artwork_id = db.Column(db.Integer, 
                           autoincrement=True, 
                           primary_key=True)
    
    portfolio_id = db.Column(db.Integer, 
                             db.ForeignKey("portfolios.portfolio_id"),
                             nullable=False)

    a_title = db.Column(db.String(75))   
    
    file_path = db.Column(db.String(100))

    portfolio = db.relationship("Portfolio", 
                                back_populates="artworks")

    def __repr__(self):
        return f"<Artwork artwork_id={self.artwork_id} a_title={self.a_title}>"


def connect_to_db(flask_app, db_uri="postgresql:///artworks", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app  
    db.init_app(flask_app)

    print("Connected to database!")


if __name__ == "__main__":
    from server import app

    # import os
    # os.system("dropdb artworks")
    # os.system("createdb artworks")

    connect_to_db(app, echo=False)

    # db.create_all()




