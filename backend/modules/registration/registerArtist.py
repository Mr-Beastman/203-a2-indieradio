from flask import Blueprint, request, jsonify
from database.models import database, Artist

artistBP = Blueprint('artistBP', __name__)

@artistBP.route('/register/artist', methods=['POST'])
def registerArtist():
    artistData = request.get_json()

    artist = Artist(
        firstName = artistData['firstName'],
        lastName = artistData['lastName'],
        username = artistData['username'],
        channelName = artistData['channelName'],
        streamUrl = artistData['streamUrl'],
        email = artistData['email'],
        password = artistData['password']
    )

    database.session.add(artist)
    database.session.commit()

    return jsonify({'message':'Arist Registered'})