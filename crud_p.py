"""CRUD operations for Portfolio table in artworks database."""

from model import db, connect_to_db, Portfolio


#p_title is required and unique
def create_portfolio(user_id, p_title):
    """Create and return a new portfolio."""

    portfolio = Portfolio(user_id=user_id, p_title=p_title)
    return portfolio


def get_portfolio_by_user_id_p_title(user_id, p_title):
    """Return a user porfolio by user_id and portfolio title as p_title"""

    portfolio = Portfolio.query.filter(
        db.func.lower(Portfolio.p_title) == p_title.lower(), 
        Portfolio.user_id == user_id).first()

    return portfolio


def get_portfolio_by_id(portfolio_id):
    """Return a user portfolio by primary key."""

    return Portfolio.query.get(portfolio_id)


def get_all_portfolios_by_user_id(user_id):
    """Return a list of all user portfolio by user_id."""

    portfolios: list = Portfolio.query.filter(
        Portfolio.user_id == user_id).order_by(db.desc(
        db.func.lower(Portfolio.p_title))).all()
 
    return portfolios


def get_portfolios_by_search_param(user_id, search_param):
    """Return a list of portfolios that match search input"""

    portfolios: list = db.session.query(Portfolio).filter(
        Portfolio.user_id == user_id).filter(
        Portfolio.p_title.ilike(f'%{search_param}%')).order_by(db.desc(db.func.lower
       (Portfolio.p_title))).all()

    return portfolios


def update_portfolio_title(portfolio_id, new_title):
    """Update portfolio title by primary key."""

    portfolio = Portfolio.query.get(portfolio_id)
    portfolio.p_title = new_title


def delete_portfolio_by_id(portfolio_id):
    """Delete a portfolio by primary key."""

    portfolio = Portfolio.query.get(portfolio_id)
    db.session.delete(portfolio)



if __name__ == "__main__":
    from server import app

    connect_to_db(app, echo=False)