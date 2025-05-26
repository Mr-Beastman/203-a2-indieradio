from flask import Blueprint, request, jsonify
from database.models import database, Artist, User

# bluprint for registration related tasks
registrationBP = Blueprint('registrationBP', __name__)


@registrationBP.route('/register/artist', methods=['POST'])
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

@registrationBP.route('/register/user', methods=['POST'])
def registerUser():
    userData = request.get_json()

    user = User(
        firstName = userData['firstName'],
        lastName = userData['lastName'],
        username = userData['username'],
        email = userData['email'],
        password = userData['password']
    )

    database.session.add(user)
    database.session.commit()

    return jsonify({'message':'User Registered'})