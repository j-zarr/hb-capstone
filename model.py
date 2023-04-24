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
    
    password = db.Column(db.String(25), 
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

    connect_to_db(app, echo=False)

# import os
# os.system("dropdb artworks")
# os.system("createdb artworks")
# db.create_all()
# test_user1 = User(username='justme', email='test1@test.com', password='test1pswd')
# db.session.add(test_user1)
# db.session.commit()

# test_user1.portfolios.append(Portfolio(p_title='abstract happy'))
# test_user1.portfolios.append(Portfolio(p_title='port2'))
# db.session.add(test_user1)
# db.session.commit()

# port1 = Portfolio.query.get(1)
# port2 = Portfolio.query.get(2)
# port1.artworks.append(Artwork(a_title='smiley splash'))
# port2.artworks.append(Artwork(a_title='untitled001'))
# port2.artworks.append(Artwork(a_title='work3'))
# db.session.commit()