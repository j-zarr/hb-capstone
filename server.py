"""Server for art app"""

from flask import Flask

app = Flask(__name__)


# will create routes and view functions after 
# model.py and crud.py files completed




if __name__ == "__main__":

    app.run(host="0.0.0.0", debug=True)