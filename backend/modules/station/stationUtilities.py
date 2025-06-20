from flask import jsonify
import requests, threading
from database.database import database
from database.models import Station

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
            stations = Station.query.all()
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