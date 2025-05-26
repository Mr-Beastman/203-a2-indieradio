from flask import Flask
from flask_cors import CORS
from modules.media import now_playing_bp
from modules.registration.registration import registrationBP
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
app.register_blueprint(now_playing_bp)

# registration blueprints
app.register_blueprint(registrationBP)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
