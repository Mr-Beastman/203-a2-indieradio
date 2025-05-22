from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.database.models import indieDatabase, Artist

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
indieDatabase.init_app(app)