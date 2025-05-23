from datetime import datetime
from models.db import db

class Show(db.Model):
    __tablename__ = 'shows'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    dj_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    genre = db.Column(db.String(50))
    schedule_time = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # Duration in minutes
    is_live = db.Column(db.Boolean, default=False)
    stream_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    dj = db.relationship('User', back_populates='shows')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'dj_id': self.dj_id,
            'dj_username': self.dj.username if self.dj else None,
            'genre': self.genre,
            'schedule_time': self.schedule_time.isoformat() if self.schedule_time else None,
            'duration': self.duration,
            'is_live': self.is_live,
            'stream_url': self.stream_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
