"""CRUD operations for database."""

from model import db, connect_to_db, User, Portfolio, Artwork


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


#using **kwargs since the p_title is optional
def create_portfolio(user, **kwargs):
    """Create and return a new portfolio."""

    portfolio = Portfolio(user=user, p_title=kwargs.get('p_title'))
    return portfolio


def get_portfolio_by_id(portfolio_id):
    """Return a user portfolio by primary key."""

    return Portfolio.query.get(portfolio_id)


def get_all_portfolios_by_user(user):
    """Return a list of all user portfolios by user."""

    portfolios :list = (User.query.get(user.user_id)).portfolios
    return portfolios


def update_portfolio_title(portfolio_id, new_title):
    """Update portfolio title by primary key."""

    portfolio = Portfolio.query.get(portfolio_id)
    portfolio.p_title = new_title


def delete_portfolio_by_id(portfolio_id):
    """Delete a portfolio by primary key."""

    portfolio = Portfolio.query.get(portfolio_id)
    db.session.delete(portfolio)

#use **kwargs since fields are optional
def create_artwork(**kwargs):
    """Create and return a new artwork."""

    artwork = Artwork(portfolio_id=kwargs.get('portfolio_id'), 
                      file_path=kwargs.get('file_path'), 
                      a_title=kwargs.get('a_title'))
    return artwork


def get_artwork_by_id(artwork_id):
    """Return a single artwork by primary key."""

    return Artwork.query.get(artwork_id)


def get_all_artworks_by_portfolio(portfolio):
    """Return a list of all artworks from one portfolio by portfolio."""

    artworks :list = (Portfolio.query.get(portfolio.portfolio_id)).artworks
    return artworks


#use **kwargs to option to update title or portfolio artwork belongs to
def update_artwork_by_id(artwork_id, **kwargs):
    """Update artwork title by primary key, or update it's portfolio by portfolio."""

    artwork = Artwork.query.get(artwork_id)
    artwork.a_title = kwargs.get('new_title')
    portfolio_obj = kwargs.get('portfolio')

    if portfolio_obj:
        artwork.portfolio.portfolio_id = portfolio_obj.portfolio_id


def delete_artwork_by_id(artwork_id):
    """Delete a portfolio by primary key"""

    artwork = Artwork.query.get(artwork_id)
    db.session.delete(artwork)


if __name__ == "__main__":
    from server import app

    connect_to_db(app, echo=False)