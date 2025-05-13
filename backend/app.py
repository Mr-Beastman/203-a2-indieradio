from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# hardcoding a live station for testing
@app.route('/nowPlaying')
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

    # Return static + dynamic data
    return jsonify({
        "name": "Classic Vinyl HD",
        "stream_url": "https://icecast.walmradio.com:8443/classic",
        "genre": "Classic Hits, Jazz, Easy Listening",
        "logo": "https://icecast.walmradio.com:8443/classic.jpg",
        "homepage": "https://walmradio.com/classic",
        "language": "English",
        "current_song": current_song
    })

if __name__ == '__main__':
    app.run(debug=True)
