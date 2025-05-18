from flask import Flask
from flask_cors import CORS
from modules.mediaPlayer import now_playing_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(now_playing_bp)

if __name__ == '__main__':
    app.run(debug=True)
