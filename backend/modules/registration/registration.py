from flask import Blueprint, request, jsonify
from database.models import database, Artist, User
from modules.utilities.utilities import usernameCheck, emailCheck


# bluprint for registration related tasks
registrationBP = Blueprint('registrationBP', __name__)


@registrationBP.route('/register/artist', methods=['POST'])
def registerArtist():
    artistData = request.get_json()

    # check if username is in use
    checkUsername = artistData.get('username')
    checkEmail = artistData.get('email')

    #temp terminal display for testing
    print("Checking Username : " + checkUsername)
    print("Checking Email : " + checkEmail)

    if usernameCheck(checkUsername):
        return jsonify({"error": "Username "+ checkUsername +" already in use"}), 400
    
    if emailCheck(checkEmail):
        return jsonify({"error": "Email "+ checkEmail +" has already been used to create an account"}), 400
    
    # valid username/email entered
    print("Check Results : No dublicates found")
    
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

    # check if username is in use
    checkUsername = userData.get('username')
    checkEmail = userData.get('email')

    #temp terminal display for testing
    print("Checking Username : " + checkUsername)
    print("Checking Email : " + checkEmail)

    if usernameCheck(checkUsername):
        return jsonify({"error": "Username "+ checkUsername +" already in use"}), 400
    
    if emailCheck(checkEmail):
        return jsonify({"error": "Email "+ checkEmail +" has already been used to create an account"}), 400
    
    # valid username/email entered
    print("Check Results : No dublicates found")

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
