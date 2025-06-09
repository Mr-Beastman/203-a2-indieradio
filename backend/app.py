from flask import Flask
from flask_cors import CORS
from modules.media.audioPlayer import audioPlayerBP
from modules.registration.registration import registrationBP
from modules.authentication.authentication import authenticationBP
from modules.station.stationRoutes import stationBP
from modules.artist.artistRoutes import artistBP
from modules.station.stationRoutes import updateLiveStatus
from database.database import database 

import os

app = Flask(__name__)
CORS(app)

# setting up database
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'database', 'indieradioData.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
database.init_app(app)

# media blueprints
app.register_blueprint(audioPlayerBP)

# registration blueprints
app.register_blueprint(registrationBP)

# auth blueprints
app.register_blueprint(authenticationBP)

#station blueprints
app.register_blueprint(stationBP)

#artist blueprints
app.register_blueprint(artistBP)


if __name__ == '__main__':
    with app.app_context():
        database.create_all()
        # updateLiveStatus(app)
    app.run(debug=True, port=5001)
