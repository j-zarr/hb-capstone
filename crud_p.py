"""CRUD operations for Portfolio table in artworks database."""

from model import db, connect_to_db, User, Portfolio, Artwork


#p_title is required and unique
def create_portfolio(user_id, p_title):
    """Create and return a new portfolio."""

    portfolio = Portfolio(user_id, p_title)
    return portfolio


def get_portfolio_by_id(portfolio_id):
    """Return a user portfolio by primary key."""

    return Portfolio.query.get(portfolio_id)


def get_all_portfolios_by_user_id(user_id):
    """Return a list of all user portfolios by user_id."""

    user = User.query.options(db.joinedload('portfolios'))
    user = user.filter(User.user_id == user_id).first()

    portfolios: list = user.portfolios
    return portfolios


def get_portfolios_by_search_param(search_param):
    """Return a list of portfolios that match search input"""

    portfolios: list = Portfolio.query.filter(
        Portfolio.p_title.ilike(f'%{search_param}%')).all()

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