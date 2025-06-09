from flask import Blueprint, jsonify, current_app
from database.models import Station
from database.database import database
import threading, requests

from .stationUtilities import buildList

# create BP
stationBP = Blueprint('station', __name__)

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

