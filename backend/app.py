from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
import os

from models.db import db
from models.user import User
from models.show import Show
from routes.auth import auth_bp
from routes.shows import shows_bp
from config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, origins=["http://localhost:3000"])
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(shows_bp, url_prefix='/api/shows')
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5001)
