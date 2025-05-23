import os
from datetime import timedelta

class Config:
    # Email Configuration
    SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', 'seductionfm23@gmail.com')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', 'wasdkl09')
    SMTP_USE_TLS = True
    
    # Database
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_NAME = os.getenv('DB_NAME', 'indieradio')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', f'mysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    
    # File Upload
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    # Streaming
    ICECAST_URL = os.getenv('ICECAST_URL', 'http://localhost:8000')
    ICECAST_ADMIN = os.getenv('ICECAST_ADMIN', 'admin')
    ICECAST_PASSWORD = os.getenv('ICECAST_PASSWORD', 'hackme')
