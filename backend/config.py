import os
from datetime import timedelta

from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Email Configuration
    SMTP_SERVER = os.getenv('SMTP_SERVER')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD')
    SMTP_USE_TLS = True
    
    if not all([SMTP_SERVER, SMTP_USERNAME, SMTP_PASSWORD]):
        print("Warning: Email configuration is incomplete. Email features may not work.")
    
    # Database
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', f'sqlite:///{os.path.join(basedir, "instance/radio.db")}')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
    if not JWT_SECRET_KEY:
        raise ValueError("JWT_SECRET_KEY must be set in environment variables")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    
    # File Upload
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Streaming
    ICECAST_URL = os.getenv('ICECAST_URL', 'http://localhost:8000')
    ICECAST_ADMIN = os.getenv('ICECAST_ADMIN')
    ICECAST_PASSWORD = os.getenv('ICECAST_PASSWORD')
    
    if not all([ICECAST_ADMIN, ICECAST_PASSWORD]):
        print("Warning: Icecast configuration is incomplete. Streaming features may not work.")
