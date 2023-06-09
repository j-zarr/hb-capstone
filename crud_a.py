"""CRUD operations for Artwork table in artworks database."""

from model import db, connect_to_db, Portfolio, Artwork


# create artwork, a_title can be optional, but attaching to a portfolio is required
# otherwise artwork will not be connected to the user
# front-end replaces no value for title as "untitled"
def create_artwork(portfolio_id, a_title, file_path):
    """Create and return a new artwork."""
   
    artwork = Artwork(portfolio_id=portfolio_id,
                       a_title=a_title, 
                       file_path=file_path)
    return artwork


def get_artwork_by_id(artwork_id):
    """Return a single artwork by primary key."""

    return Artwork.query.get(artwork_id)


def get_all_artworks_by_portfolio_id(portfolio_id):
    """Return a list of all artworks from one portfolio by portfolio_id."""

    # portfolio = Portfolio.query.options(db.joinedload('artworks'))
    # portfolio = portfolio.filter(Portfolio.portfolio_id == portfolio_id).first()
    
    # artworks = portfolio.artworks
    artworks: list = Artwork.query.filter(
        Artwork.portfolio_id == portfolio_id).order_by(db.desc
        (db.func.lower(Artwork.a_title))).all()
        
    return artworks


def get_all_artworks_by_user_id(user_id):
    """Return a list of all artworks from all user portfolios"""

    portfolios = Portfolio.query.options(db.joinedload('artworks'))
    portfolios = portfolios.filter(Portfolio.user_id == user_id).all()
   
    artworks: list = []
    
    for portfolio in portfolios:
       artworks.extend(portfolio.artworks)

    return artworks


def get_artworks_by_search_param(search_param, user_id):
    """Return a list of artworks that match search input"""

    artworks: list= db.session.query(Artwork).filter(
        Portfolio.user_id == user_id).filter(
        Artwork.a_title.ilike(f'%{search_param}%')).order_by(db.desc(db.func.lower(
        Artwork.a_title))).join(Portfolio).all()
    
    return artworks


#use **kwargs to option to update title or portfolio artwork belongs to
def update_artwork_by_id(artwork_id, portfolio_id, **kwargs):
    """Update artwork title by primary key, or update it's portfolio by portfolio."""

    artwork = Artwork.query.get(artwork_id) 

    artwork.portfolio_id = portfolio_id
    
    if kwargs.get('new_title', 0) != 0:
        artwork.a_title = kwargs['new_title']


def delete_artwork_by_id(artwork_id):
    """Delete a portfolio by primary key"""

    artwork = Artwork.query.get(artwork_id)
    db.session.delete(artwork)


if __name__ == "__main__":
    from server import app

    connect_to_db(app, echo=False)