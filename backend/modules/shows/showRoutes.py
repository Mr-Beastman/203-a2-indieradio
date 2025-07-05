from flask import Blueprint, request, jsonify
from datetime import datetime
from database.models import  Show
from database.database import database
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS

showsBP = Blueprint('shows', __name__)

CORS(showsBP)

@showsBP.route('/shows/monthly', methods=['GET'])
def getMonthlyShows():
    stationId = request.args.get('stationId')
    month = request.args.get('month')
    year = request.args.get('year')

    if not stationId or not month or not year:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        # start and end of the month
        start = datetime(int(year), int(month), 1)
        if int(month) == 12:
            end = datetime(int(year) + 1, 1, 1)
        else:
            end = datetime(int(year), int(month) + 1, 1)

        # Create a database session
        Session = sessionmaker(bind=database.engine)
        session = Session()

        # Query using SQLAlchemy
        shows = session.query(Show).filter(
            Show.stationId == int(stationId),
            Show.startTime >= start,
            Show.startTime < end
        ).order_by(Show.startTime.asc()).all()


        showData = []
        for show in shows:
            showData.append({
                'id': show.id,
                'title': show.title,
                'description': show.description,
                'startTime': show.startTime.isoformat(),
                'endTime': show.endTime.isoformat(),
                'artistUsername': show.artistName  # assuming this is the artist's username
            })
            

        return jsonify(showData)
    
    except Exception as error:
        print("Error retrieving monthly shows:", error)
        return(jsonify({'error' : 'Server Error'}))

# add new show
@showsBP.route('/shows/create', methods=['POST'])
def createShow():
    data = request.get_json()

    required_fields = ['stationId', 'title', 'artistUsername', 'startTime', 'endTime']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'})

    try:
        Session = sessionmaker(bind=database.engine)
        session = Session()

        new_show = Show(
            stationId=data['stationId'],
            title=data['title'],
            description=data.get('description', ''),
            startTime=datetime.fromisoformat(data['startTime']),
            endTime=datetime.fromisoformat(data['endTime']),
            artistName=data['artistUsername']
        )

        session.add(new_show)
        session.commit()

        return jsonify({
            'id': new_show.id,
            'title': new_show.title,
            'description': new_show.description,
            'startTime': new_show.startTime.isoformat(),
            'endTime': new_show.endTime.isoformat(),
            'artistUsername': new_show.artistName
        }), 201

    except Exception as e:
        print("Error creating show:", e)
        return jsonify({'error': 'Server error'})

# delete show by id
@showsBP.route('/shows/delete/<int:showId>', methods=['DELETE', 'OPTIONS'])
def deleteShow(showId):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight accepted'}), 200

    try:
        Session = sessionmaker(bind=database.engine)
        session = Session()

        show = session.query(Show).get(showId)
        if not show:
            return jsonify({'error': 'Show not found'}), 404

        session.delete(show)
        session.commit()

        return jsonify({'message': 'Show deleted successfully'}), 200

    except Exception as e:
        print("Error deleting show:", e)
        return jsonify({'error': 'Server error'}), 500