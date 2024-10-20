import os
import sys
from flask_jwt_extended import create_access_token, jwt_required, JWTManager
from flask import *
from flask_cors import CORS
from flask_sqlalchemy import *


# Instantiate the application and define settings.
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.urandom(32)

CORS(app)


## Load the database.
db = SQLAlchemy(app)
from model import *
with app.app_context():
	db.create_all()

app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a strong secret
jwt = JWTManager(app)


#from security import *
from route import *
#from api import *
