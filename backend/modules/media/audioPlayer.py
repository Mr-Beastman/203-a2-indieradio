from flask import Blueprint,request,Response, jsonify
import requests

audioPlayerBP = Blueprint('audioPlayerBP', __name__)

# quick coded media player to handle display and streaming for testing purposes.

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

# ====== starting to expand stream functions below this line ======

@audioPlayerBP.route('/playStation')
def playStation():
    # hardcoded url for testing - taken from https://dir.xiph.org/
    streamUrl = request.args.get('url','http://digitalaudiobroadcasting.net:8015/stream')

    try:
        audio = requests.get(streamUrl, stream=True)
        return Response(audio.iter_content(chunk_size = 1024), content_type='audio/mpeg')
    except Exception as error:
        return f"Error : {str(error)}"