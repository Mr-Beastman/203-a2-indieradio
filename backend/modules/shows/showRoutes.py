from flask import Blueprint, request, jsonify
from datetime import datetime
from database.models import  Show

showsBP = Blueprint('shows', __name__)

@showsBP.route('/shows/monthly', methods=['GET'])
def get_monthly_shows():
    stationId = request.args.get('stationId')
    month = request.args.get('month')
    year = request.args.get('year')

    if not stationId or not month or not year:
        return jsonify({'error': 'Missing parameters'}), 400

    # Start and end of the month
    start = datetime(int(year), int(month), 1)
    if int(month) == 12:
        end = datetime(int(year) + 1, 1, 1)
    else:
        end = datetime(int(year), int(month) + 1, 1)

    db = Show()
    cursor = db.cursor()
    cursor.execute('''
        SELECT * FROM shows
        WHERE stationId = ?
        AND startTime >= ? AND startTime < ?
        ORDER BY startTime ASC
    ''', (stationId, start.isoformat(), end.isoformat()))

    rows = cursor.fetchall()
    shows = [
        {
            'id': row['id'],
            'title': row['title'],
            'description': row['description'],
            'startTime': row['startTime'],
            'artistUsername': row['artistUsername']
        }
        for row in rows
    ]
    return jsonify(shows)