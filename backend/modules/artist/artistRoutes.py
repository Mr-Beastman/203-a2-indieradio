from flask import Blueprint, jsonify
from database.models import Artist
from .artistUtilities import buildList

# create BP
artistBP = Blueprint('artist', __name__)

# query all stations
@artistBP.route('/artist/getArtists', methods=['GET'])
def getArtists():
    artists = Artist.query.all()

    return buildList(artists)
