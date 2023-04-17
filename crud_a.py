"""CRUD operations Artwork for table in artworks database."""

from model import db, connect_to_db, User, Portfolio, Artwork


# create artwork, a_title optional, but attaching to a portfolio is required
# otherwise artwork will not be connected to the user
def create_artwork(portfolio_title, **kwargs):
    """Create and return a new artwork."""

    portfolio = db.session.query(Portfolio).filter(
        Portfolio.p_title == portfolio_title).first()
    
    a_title = kwargs.get('a_title') 
    file_path = kwargs.get('file_path')


    artwork = Artwork(portfolio_id=portfolio.portfolio_id,
                       a_title=a_title, 
                       file_path=file_path)
    return artwork


def get_artwork_by_id(artwork_id):
    """Return a single artwork by primary key."""

    return Artwork.query.get(artwork_id)


def get_all_artworks_by_portfolio_id(portfolio_id):
    """Return a list of all artworks from one portfolio by portfolio_id."""

    portfolio = Portfolio.query.options(db.joinedload('artworks'))
    portfolio = portfolio.filter(
        Portfolio.portfolio_id == portfolio_id).first()
    
    artworks = portfolio.artworks

    return artworks


def get_all_artworks_by_user_id(user_id):
    """Return a list of all artworks from all user portfolios"""

    portfolios = Portfolio.query.options(db.joinedload('artworks')).order_by(Artwork.a_title)
    portfolios = portfolios.filter(Portfolio.user_id == user_id).all()
   
    artworks: list = []
    
    for portfolio in portfolios:
       artworks.extend(portfolio.artworks)

    return artworks


def get_artworks_by_search_param(search_param, user_id):
    """Return a list of artworks that match search input"""

    artworks: list = db.session.query(Artwork).filter(
        Artwork.user_id == user_id).filter(
        Artwork.a_title.ilike(f'%{search_param}%')).order_by(
        Artwork.a_title).all()
    
    return artworks


#use **kwargs to option to update title or portfolio artwork belongs to
def update_artwork_by_id(artwork_id, **kwargs):
    """Update artwork title by primary key, or update it's portfolio by portfolio."""

    artwork = Artwork.query.get(artwork_id) 
    artwork.file_path = kwargs.get('file_path') 
    artwork.a_title = kwargs.get('new_title') 
    artwork.portfolio_id = kwargs.get('portfolio_id') 


def delete_artwork_by_id(artwork_id):
    """Delete a portfolio by primary key"""

    artwork = Artwork.query.get(artwork_id)
    db.session.delete(artwork)


if __name__ == "__main__":
    from server import app

    connect_to_db(app, echo=False)