from flask import Flask
from apis import api
import db.init_db as db

#db.init_db()

app = Flask(__name__)
api.init_app(app)
