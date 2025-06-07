from flask import Blueprint, jsonify
from database.models import Artist
from database.database import database

# create BP
stationBP = Blueprint('station', __name__)

# build list from route query
def buildList(stations):
    # create list to hold stations
    stationList = []

    # populate list
    for station in stations:
        stationList.append({
            "id" : station.id,
            "name" : station.channelName,
            "logoUrl" : station.logo
        })

    return jsonify(stationList)


# query all stations
@stationBP.route('/station/getStations', methods=['GET'])
def getStations():
    stations = Artist.query.all()

    return buildList(stations)

# query all stations with live status
@stationBP.route('/station/getLiveStations', methods=['GET'])
def getLiveStations():
    stations = Artist.query.filter_by(live=1).all()

    return buildList(stations)

# get single station info from ID
@stationBP.route('/station/<int:id>', methods =['GET'])
def getStationById(id):
    station = Artist.query.get(id)

    stationData = {
        'id': station.id,
        'channelName': station.channelName,
        'streamUrl': station.streamUrl,
        'logo': station.logo
    }

    return jsonify(stationData)

