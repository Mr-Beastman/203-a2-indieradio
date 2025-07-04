# import flask
from flask import Flask
from flask_cors import CORS
import threading
from flask_socketio import SocketIO

# import from modules
from modules.media.audioPlayer.audioPlayer import audioPlayerBP
from modules.registration.registration import registrationBP
from modules.authentication.authentication import authenticationBP
from modules.station.stationRoutes import stationBP
from modules.subscribe.subscribeRoutes import subscriptionBP
from modules.shows.showRoutes import showsBP
from modules.artist.artistRoutes import artistBP

# import utillities
from modules.station.stationUtilities import updateLiveStatus


# import database
from database.database import database 

import os

app = Flask(__name__)
CORS(app)

socketIo = SocketIO(cors_allowed_origins="*")
socketIo.init_app(app)

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

#listner blueprints
app.register_blueprint(showsBP)

#artist blueprints
app.register_blueprint(artistBP)

#subscribtion blueprints
app.register_blueprint(subscriptionBP)

# show blueprints

#chat blueprints
from modules.chat.chatRoutes import chatBP, register_socketio_handlers
app.register_blueprint(chatBP)
register_socketio_handlers(socketIo)



if __name__ == '__main__':
    with app.app_context():
        database.create_all()
        threading.Thread(target=updateLiveStatus, args=(app,), daemon=True).start()
    socketIo.run(app, debug=True, port=5001)
