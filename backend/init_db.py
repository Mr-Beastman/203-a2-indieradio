from app import create_app, db
from models.user import User
from models.show import Show
from datetime import datetime, timedelta

def init_db():
    app = create_app()
    with app.app_context():
        # Create tables
        db.create_all()

        # Create test DJ user
        dj = User(
            username='dj_seduction',
            email='dj@example.com',
            role='dj'
        )
        dj.set_password('password123')
        db.session.add(dj)
        db.session.commit()

        # Create some test shows
        current_time = datetime.utcnow()
        
        # Late Night Seduction show
        show1 = Show(
            title='Late Night Seduction',
            description='Smooth and sensual beats to get you through the night',
            dj_id=dj.id,
            genre='Deep House',
            schedule_time=current_time,
            duration=120,  # 2 hours
            is_live=True,
            stream_url='http://localhost:8000/stream'
        )
        db.session.add(show1)

        # Midnight Groove show
        show2 = Show(
            title='Midnight Groove',
            description='The perfect blend of R&B and Soul',
            dj_id=dj.id,
            genre='R&B',
            schedule_time=current_time + timedelta(days=1),
            duration=120,
            stream_url='http://localhost:8000/stream'
        )
        db.session.add(show2)

        # Velvet Dreams show
        show3 = Show(
            title='Velvet Dreams',
            description='Smooth jazz and neo-soul for your evening',
            dj_id=dj.id,
            genre='Jazz',
            schedule_time=current_time + timedelta(days=2),
            duration=120,
            stream_url='http://localhost:8000/stream'
        )
        db.session.add(show3)
        
        db.session.commit()
        print("Database initialized with test data!")

if __name__ == '__main__':
    init_db()
