from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import jwt
from flask import current_app, request
from datetime import datetime, timedelta
from models.show import Show, db
from models.user import User

shows_bp = Blueprint('shows', __name__)

def is_dj():
    auth_header = request.headers.get('Authorization', None)
    if not auth_header:
        return False
    token = auth_header.split()[1]
    try:
        claims = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        return claims.get('role') == 'dj'
    except Exception:
        return False

@shows_bp.route('/', methods=['POST'])
@jwt_required()
def create_show():
    if not is_dj():
        return jsonify({'error': 'Only DJs can create shows'}), 403
        
    data = request.get_json()
    required_fields = ['title', 'schedule_time', 'duration']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        schedule_time = datetime.fromisoformat(data['schedule_time'])
    except ValueError:
        return jsonify({'error': 'Invalid schedule time format'}), 400
    
    show = Show(
        title=data['title'],
        description=data.get('description', ''),
        dj_id=get_jwt_identity(),
        genre=data.get('genre'),
        schedule_time=schedule_time,
        duration=data['duration'],
        stream_url=data.get('stream_url')
    )
    
    db.session.add(show)
    db.session.commit()
    
    return jsonify({
        'message': 'Show created successfully',
        'show': show.to_dict()
    }), 201

@shows_bp.route('/', methods=['GET'])
def get_shows():
    try:
        # Get query parameters
        dj_id = request.args.get('dj_id', type=int)
        genre = request.args.get('genre')
        is_live = request.args.get('is_live', type=bool)
        
        # Build query
        query = Show.query
        
        if dj_id:
            query = query.filter_by(dj_id=dj_id)
        if genre:
            query = query.filter_by(genre=genre)
        if is_live is not None:
            query = query.filter_by(is_live=is_live)
            
        # Get all shows ordered by schedule time
        shows = query.order_by(Show.schedule_time).all()
        
        return jsonify({
            'shows': [show.to_dict() for show in shows]
        })
    except Exception as e:
        print(f"Error in get_shows: {str(e)}")
        return jsonify({'error': 'Failed to fetch shows'}), 500

@shows_bp.route('/<int:show_id>', methods=['GET'])
def get_show(show_id):
    show = Show.query.get_or_404(show_id)
    return jsonify(show.to_dict())

@shows_bp.route('/<int:show_id>', methods=['PUT'])
@jwt_required()
def update_show(show_id):
    show = Show.query.get_or_404(show_id)
    
    # Check if user is the show's DJ
    if show.dj_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized to modify this show'}), 403
    
    data = request.get_json()
    
    # Update allowed fields
    if 'title' in data:
        show.title = data['title']
    if 'description' in data:
        show.description = data['description']
    if 'genre' in data:
        show.genre = data['genre']
    if 'schedule_time' in data:
        try:
            show.schedule_time = datetime.fromisoformat(data['schedule_time'])
        except ValueError:
            return jsonify({'error': 'Invalid schedule time format'}), 400
    if 'duration' in data:
        show.duration = data['duration']
    if 'is_live' in data:
        show.is_live = data['is_live']
        if data['is_live']:
            # When show goes live, set the stream URL to the Icecast mount point
            show.stream_url = 'http://localhost:8000/stream'
        else:
            show.stream_url = None
        
    db.session.commit()
    
    return jsonify({
        'message': 'Show updated successfully',
        'show': show.to_dict()
    })

@shows_bp.route('/<int:show_id>', methods=['DELETE'])
@jwt_required()
def delete_show(show_id):
    show = Show.query.get_or_404(show_id)
    
    # Check if user is the show's DJ
    if show.dj_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized to delete this show'}), 403
        
    db.session.delete(show)
    db.session.commit()
    
    return jsonify({
        'message': 'Show deleted successfully'
    })

@shows_bp.route('/current', methods=['GET'])
def get_current_show():
    try:
        current_time = datetime.utcnow()
        
        # Find the show that's currently live
        current_show = Show.query.filter(
            Show.schedule_time <= current_time,
            Show.is_live == True
        ).order_by(Show.schedule_time.desc()).first()

        if current_show:
            # Calculate end time manually
            end_time = current_show.schedule_time + timedelta(minutes=current_show.duration)
            if end_time < current_time:
                return jsonify({'message': 'No show is currently live'}), 404
            return jsonify(current_show.to_dict())
        
        return jsonify({'message': 'No show is currently live'}), 404
    except Exception as e:
        print(f"Error in get_current_show: {str(e)}")
        return jsonify({'error': 'Failed to fetch current show'}), 500
