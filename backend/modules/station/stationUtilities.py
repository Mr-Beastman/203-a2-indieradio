from flask import jsonify
import requests, threading
from database.database import database
from database.models import Station
from sqlalchemy.orm import sessionmaker
from concurrent.futures import ThreadPoolExecutor, as_completed



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

###################### Background Tasks ######################

stop_event = threading.Event()

# check if station active
def checkStationActive(url):
    try:
        headers = {'Icy-Metadata': '1',
            'User-Agent': 'WinampMPEG/5.09',
            'Accept': '*/*',}
        repsonse = requests.get(url, stream=True, timeout=5, headers=headers)
        contentType = repsonse.headers.get('Content-Type','')
        return "audio" in contentType
    except Exception as error:
        print(f"stream check failed for {url}: {error}")
        return False

# uses seperate SQLAlchemy session for thread safety and only commits if changes present

def checkUpdate(station):
    active = checkStationActive(station.streamUrl)
    changed = False
    if active and station.live != 1:
        station.live = 1
        print(f"{station.channelName} is now live")
        changed = True
    elif not active and station.live != 0:
        station.live = 0
        print(f"{station.channelName} is no longer live")
        changed = True
    return changed

def updateLiveStatus(app):

    print("Running updateLiveStatus...")
    
    with app.app_context():
        Session = sessionmaker(bind=database.engine)
        session = Session()
        statusChange = False

        try:
            stations = session.query(Station).all()

            with ThreadPoolExecutor(max_workers=15) as tasks:
                futures = {tasks.submit(checkUpdate, station): station for station in stations}
                for future in as_completed(futures):
                    if future.result():
                        statusChange = True
            
            # save updates if made
            if statusChange:
                session.commit()

        except KeyboardInterrupt:
            print("Update stopped by user interrupt.")
            return
        except Exception as error:
            print("Failed to update live status: ", error)
        finally:
            session.close()

        if not stop_event.is_set():
            threading.Timer(60, updateLiveStatus, args=[app]).start()