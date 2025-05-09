# app.py
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Hard coded radio station to test 
@app.route('/nowPlaying')
def get_stations():
    return jsonify([
        {
            "name": "Classic Vinyl HD",
            "stream_url": "https://icecast.walmradio.com:8443/classic",
            "genre": "Classic Hits, Jazz, Easy Listening",
            "logo": "https://icecast.walmradio.com:8443/classic.jpg",
            "homepage": "https://walmradio.com/classic",
            "language": "English"
        }
    ])

if __name__ == '__main__':
    app.run(debug=True)
