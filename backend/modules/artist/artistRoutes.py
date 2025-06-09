from flask import Blueprint, jsonify
from database.models import Dj
from database.database import database
from .artistUtilities import buildList

# create BP
artistBP = Blueprint('artist', __name__)

# query all stations
@artistBP.route('/artist/getArtists', methods=['GET'])
def getArtists():
    artists = Dj.query.all()

    return buildList(artists)
