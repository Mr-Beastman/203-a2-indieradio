from flask import Blueprint, jsonify, current_app, request
from database.models import Station, database

from .stationUtilities import buildList

# create BP
stationBP = Blueprint('station', __name__)

# changing live status manually
@stationBP.route('/station/setLive', methods=['POST'])
def setLive():

    data = request.get_json()
    stationId = data.get('id')

    station = Station.query.get(stationId)

    if not station:
        return jsonify({"error": "Can't find station"})
    
    station.live = 0 if station.live == 1 else 1
    database.session.commit()
    return jsonify({"message": f"Station {station.channelName} toggled to {station.live}"})
    


# query all stations
@stationBP.route('/station/getStations', methods=['GET'])
def getStations():
    stations = Station.query.all()

    return buildList(stations)

# query all stations with live status
@stationBP.route('/station/getLiveStations', methods=['GET'])
def getLiveStations():
    stations = Station.query.filter_by(live=1).all()

    return buildList(stations)

# get station info from ID
@stationBP.route('/station/<int:id>', methods =['GET'])
def getStationById(id):
    station = Station.query.get(id)

    stationData = {
        'id': station.id,
        'channelName': station.channelName,
        'streamUrl': station.streamUrl,
        'logo': station.logo,
        'tag' : station.tagLine,
        'bio' :station.bio,
        'live': station.live
    }

    return jsonify(stationData)

# get station info from username
@stationBP.route('/station/<username>', methods =['GET'])
def getStationByUsername(username):
    station = Station.query.filter_by(username=username).first()

    stationData = {
        'id': station.id,
        'channelName': station.channelName,
        'streamUrl': station.streamUrl,
        'logo': station.logo,
        'tag' : station.tagLine,
        'bio' :station.bio,
        'live': station.live
    }

    return jsonify(stationData)

