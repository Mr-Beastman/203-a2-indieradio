from flask import Blueprint, jsonify
import requests

now_playing_bp = Blueprint('now_playing', __name__)

# quick coded media player to handle display and streaming for testing purposes.

@now_playing_bp.route('/nowPlaying')
def get_station_info():
    try:
        response = requests.get("https://icecast.walmradio.com:8443/status-json.xsl", timeout=5)
        status = response.json()

        sources = status.get("icestats", {}).get("source", [])
        if isinstance(sources, list):
            source_info = next((s for s in sources if s.get("listenurl", "").endswith("/classic")), {})
        else:
            source_info = sources  # Single source

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
