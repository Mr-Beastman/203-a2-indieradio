from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models.db import db
import jwt
import datetime
from functools import wraps
from utils.email import send_password_reset_email
import secrets

auth_bp = Blueprint('auth', __name__)

# Secret key for JWT
SECRET_KEY = 'your-secret-key'  # In production, use environment variable

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token is missing'}), 401
        try:
            token = token.split()[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except Exception:
            return jsonify({'error': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not all(k in data for k in ['username', 'password', 'email', 'role']):
        return jsonify({'error': 'Missing required fields'}), 400
        
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
        
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
        
    hashed_password = generate_password_hash(data['password'])
    
    new_user = User(
        username=data['username'],
        password=hashed_password,
        email=data['email'],
        role=data['role']
    )
    
    try:
        db.session.add(new_user)
        db.session.commit()
        
        token = jwt.encode({
            'user_id': new_user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY)
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': new_user.id,
                'username': new_user.username,
                'email': new_user.email,
                'role': new_user.role
            }
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not all(k in data for k in ['username', 'password']):
        return jsonify({'error': 'Missing username or password'}), 400
        
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid username or password'}), 401
        
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY)
    
    return jsonify({
        'success': True,
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role
        }
    })

@auth_bp.route('/verify', methods=['GET'])
@token_required
def verify(current_user):
    return jsonify({
        'success': True,
        'user': {
            'id': current_user.id,
            'username': current_user.username,
            'email': current_user.email,
            'role': current_user.role
        }
    })

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    if 'email' not in data:
        return jsonify({'error': 'Email is required'}), 400
        
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'error': 'No account found with this email'}), 404
    
    # Generate temporary password
    temp_password = secrets.token_urlsafe(8)  # 8 characters long
    user.password = generate_password_hash(temp_password)
    user.reset_token = secrets.token_urlsafe(32)  # For immediate password change
    user.reset_token_expires = datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    
    try:
        db.session.commit()
        return jsonify({
            'success': True,
            'message': 'Temporary password generated',
            'temp_password': temp_password,
            'reset_token': user.reset_token
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    if not all(k in data for k in ['token', 'new_password']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    user = User.query.filter_by(reset_token=data['token']).first()
    
    if not user or not user.reset_token_expires or user.reset_token_expires < datetime.datetime.utcnow():
        return jsonify({'error': 'Invalid or expired reset token'}), 400
    
    try:
        user.password = generate_password_hash(data['new_password'])
        user.reset_token = None
        user.reset_token_expires = None
        db.session.commit()
        return jsonify({'success': True, 'message': 'Password successfully reset'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
