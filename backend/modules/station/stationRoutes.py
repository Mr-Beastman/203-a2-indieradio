from flask import Blueprint, jsonify, current_app
from database.models import Artist
from database.database import database
import threading, requests

####### Reafctor research required #####
# will move to ulities but it won't reconise path? #
stop_event = threading.Event()

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

# check if station active
def checkStationActive(url):
    try:
        headers = {'Ice-Metadata' : '1'}
        repsonse = requests.get(url, stream=True, timeout=5, headers=headers)
        contentType = repsonse.headers.get('Content-Type','')
        return "audio" in contentType
    except Exception as error:
        print(f"stream check failed for {url}: {error}")
        return False

# update the database status 
# working but slow, researching to confirm options
def updateLiveStatus(app):
    with app.app_context():
        try:
            stations = Artist.query.all()
            for station in stations:
                if checkStationActive(station.streamUrl):
                    if station.live != 1:
                        station.live = 1
                        print(f"{station.channelName} is now live")
                else:
                    if station.live != 0:
                        station.live = 0
                        print(f"{station.channelName} is no longer live")
            
            # save updates
            database.session.commit()
        except KeyboardInterrupt:
            print("Update stopped by user interrupt.")
            return
        except Exception as error:
            print("Failed to update live status: ", error)

        if not stop_event.is_set():
            threading.Timer(60, updateLiveStatus, args=[app]).start()


######################## Routes ####################################

# create BP
stationBP = Blueprint('station', __name__)

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

# get station info from ID
@stationBP.route('/station/<int:id>', methods =['GET'])
def getStationById(id):
    station = Artist.query.get(id)

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

