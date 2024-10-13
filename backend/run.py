from flask import Flask
from apis import api
import db.init_db as db
from flask_cors import CORS

#db.init_db()

app = Flask(__name__)
CORS(app)
api.init_app(app)
