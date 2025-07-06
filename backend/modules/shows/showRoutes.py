from flask import Blueprint, request, jsonify
from datetime import datetime, timezone, timedelta
from database.models import  Show
from database.database import database
from sqlalchemy.orm import sessionmaker
from flask_cors import CORS
from zoneinfo import ZoneInfo

# ultilities
from .showUtilities import getWeek

showsBP = Blueprint('shows', __name__)

CORS(showsBP)

# hardcoded local timezone for development
localTimezone = ZoneInfo('Pacific/Auckland')

@showsBP.route('/shows/weekly', methods=['GET'])
def getWeeklyShows():
    stationId = request.args.get('stationId')
    day = request.args.get('day')
    month = request.args.get('month')
    year = request.args.get('year')

    if not stationId or not day or not month or not year:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        localTimezone = ZoneInfo('Pacific/Auckland')
        inputDate = datetime(int(year), int(month), int(day), tzinfo=localTimezone)

        # get starting monday
        startLocal, endLocal = getWeek(inputDate)

        Session = sessionmaker(bind=database.engine)
        session = Session()

        shows = session.query(Show).filter(
            Show.stationId == int(stationId),
            Show.startTime >= startLocal,
            Show.startTime < endLocal
        ).order_by(Show.startTime.asc()).all()

        showData = []
        for show in shows:
            showData.append({
                'id': show.id,
                'title': show.title,
                'description': show.description,
                'startTime': show.startTime.isoformat(),
                'endTime': show.endTime.isoformat(),
                'artistUsername': show.artistName
            })

        return jsonify(showData)

    except Exception as error:
        print("Error retrieving weekly shows:", error)
        return jsonify({'error': 'Server Error'})
    
@showsBP.route('/shows/weeklySubscribed', methods=['POST'])
def getWeeklySubscribed():
    data = request.get_json()

    stations = data.get('stations')
    day = data.get('day')
    month = data.get('month')
    year = data.get('year')

    if not stations or not isinstance(stations, list):
        return jsonify({'error': 'Missing or invalid stations list'})

    try:
        localTimezone = ZoneInfo('Pacific/Auckland')
        inputDate = datetime(int(year), int(month), int(day), tzinfo=localTimezone)

        # get starting monday
        startLocal, endLocal = getWeek(inputDate)

        Session = sessionmaker(bind=database.engine)
        session = Session()

        # get the station ids
        station_ids = [station['id'] for station in stations if 'id' in station]

        if not station_ids:
            return jsonify({'error': 'No valid station IDs provided'}), 400

        # check all stations provided for shows
        shows = session.query(Show).filter(
            Show.stationId.in_(station_ids),
            Show.startTime >= startLocal,
            Show.startTime < endLocal
        ).order_by(Show.startTime.asc()).all()

        showData = []
        for show in shows:
            showData.append({
                'id': show.id,
                'channelName': show.station.channelName,
                'title': show.title,
                'description': show.description,
                'startTime': show.startTime.isoformat(),
                'endTime': show.endTime.isoformat(),
                'artistUsername': show.artistName
            })

        return jsonify(showData)

    except Exception as error:
        print("Error retrieving weekly subscribed shows:", error)
        return jsonify({'error': 'Server Error'})
    
@showsBP.route('/shows/monthly', methods=['GET'])
def getMonthlyShows():
    stationId = request.args.get('stationId')
    month = request.args.get('month')
    year = request.args.get('year')

    if not stationId or not month or not year:
        return jsonify({'error': 'Missing parameters'}), 400

    try:
        # start and end of the month
        start = datetime(int(year), int(month), 1, tzinfo=timezone.utc)
        if int(month) == 12:
            end = datetime(int(year) + 1, 1, 1, tzinfo=timezone.utc)
        else:
            end = datetime(int(year), int(month) + 1, 1, tzinfo=timezone.utc)

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
                'artistUsername': show.artistName
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
        startTime = datetime.fromisoformat(data['startTime'])
        endTime = datetime.fromisoformat(data['endTime'])

        # Localize to NZ time if naive or convert to NZ time if timezone aware
        if startTime.tzinfo is None:
            startTime = startTime.replace(tzinfo=localTimezone)
        else:
            startTime = startTime.astimezone(localTimezone)

        if endTime.tzinfo is None:
            endTime = endTime.replace(tzinfo=localTimezone)
        else:
            endTime = endTime.astimezone(localTimezone)

        if endTime <= startTime:
            return jsonify({'error': 'endTime must be after startTime'})

        Session = sessionmaker(bind=database.engine)
        session = Session()

        newShow = Show(
            stationId=data['stationId'],
            title=data['title'],
            description=data.get('description', ''),
            startTime=startTime,
            endTime=endTime,
            artistName=data['artistUsername']
        )

        session.add(newShow)
        session.commit()

        return jsonify({
            'id': newShow.id,
            'title': newShow.title,
            'description': newShow.description,
            'startTime': newShow.startTime.isoformat(),
            'endTime': newShow.endTime.isoformat(),
            'artistUsername': newShow.artistName
        })

    except Exception as error:
        print("Error creating show:", error)
        return jsonify({'error': 'Server error'})

# delete show by id
@showsBP.route('/shows/delete/<int:showId>', methods=['DELETE', 'OPTIONS'])
def deleteShow(showId):
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight accepted'})

    try:
        Session = sessionmaker(bind=database.engine)
        session = Session()

        show = session.query(Show).get(showId)
        if not show:
            return jsonify({'error': 'Show not found'})

        session.delete(show)
        session.commit()

        return jsonify({'message': 'Show deleted successfully'})

    except Exception as e:
        print("Error deleting show:", e)
        return jsonify({'error': 'Server error'})

# get currently airing show 
@showsBP.route('/shows/current', methods=['GET'])
def getCurrentShow():
    stationId = request.args.get('stationId')

    if not stationId:
        return jsonify({'error': 'Missing stationId'})

    try:
        now = datetime.now(timezone.utc)

        Session = sessionmaker(bind=database.engine)
        session = Session()

        show = session.query(Show).filter(
            Show.stationId == int(stationId),
            Show.startTime <= now,
            Show.endTime >= now
        ).order_by(Show.startTime.asc()).first()

        if not show:
            return jsonify({'message': 'No current show'})

        return jsonify({
            'id': show.id,
            'title': show.title,
            'description': show.description,
            'startTime': show.startTime.astimezone(localTimezone).isoformat(),
            'endTime': show.endTime.astimezone(localTimezone).isoformat(),
            'artistUsername': show.artistName
        })

    except Exception as e:
        print("Error fetching current show:", e)
        return jsonify({'error': 'Server error'})


# get the next show for a station
@showsBP.route('/shows/next', methods=['GET'])
def getNextShow():
    stationId = request.args.get('stationId')

    if not stationId:
        return jsonify({'error': 'Missing stationId'})

    try:
        now = datetime.now(timezone.utc)

        Session = sessionmaker(bind=database.engine)
        session = Session()

        show = session.query(Show).filter(
            Show.stationId == int(stationId),
            Show.startTime > now
        ).order_by(Show.startTime.asc()).first()

        if not show:
            return jsonify({'message': 'No upcoming shows'})

        return jsonify({
            'id': show.id,
            'title': show.title,
            'description': show.description,
            'startTime': show.startTime.astimezone(localTimezone).isoformat(),
            'endTime': show.endTime.astimezone(localTimezone).isoformat(),
            'artistUsername': show.artistName
        })

    except Exception as e:
        print("Error fetching next show:", e)
        return jsonify({'error': 'Server error'})