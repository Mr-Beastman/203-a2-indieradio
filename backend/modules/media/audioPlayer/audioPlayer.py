from flask import Blueprint,request,Response, jsonify
import requests

audioPlayerBP = Blueprint('audioPlayerBP', __name__)

# quick coded media player to handle display and streaming for testing purposes.
# most code is now redundent as we are pulling from the database. Will need to review what can be taken.

@audioPlayerBP.route('/nowPlaying')

def nowPlaying():
    try:
        response = requests.get("https://icecast.walmradio.com:8443/status-json.xsl", timeout=5)
        status = response.json()

        sources = status.get("icestats", {}).get("source", [])
        if isinstance(sources, list):
            source_info = next((s for s in sources if s.get("listenurl", "").endswith("/classic")), {})
        else:
            source_info = sources

        current_song = source_info.get("title", "Unknown")

    except Exception as e:
        print("Error fetching Icecast data:", e)
        current_song = "Unknown"

    return jsonify({
        "name": "Classic Vinyl HD",
        "stream_url": "https://icecast.walmradio.com:8443/classic",
        "genre": "Classic Hits, Jazz, Easy Listening",
        "logo": "https://icecast.walmradio.com:8443/classic.jpg",
        "homepage": "https://walmradio.com/classic",
        "language": "English",
        "current_song": current_song
    })