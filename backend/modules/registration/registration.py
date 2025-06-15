from flask import Blueprint, request, jsonify
from database.models import database, Station, User
from modules.utilities.utilities import usernameCheck, emailCheck


# bluprint for registration related tasks
registrationBP = Blueprint('registrationBP', __name__)


@registrationBP.route('/register/artist', methods=['POST'])
def registerStation():
    stationData = request.get_json()

    # check if username is in use
    checkUsername = stationData.get('username').lower()
    checkEmail = stationData.get('email').lower()

    #temp terminal display for testing
    print("Checking Username : " + checkUsername)
    print("Checking Email : " + checkEmail)

    if usernameCheck(checkUsername):
        return jsonify({"error": "Username "+ checkUsername +" already in use"}), 400
    
    if emailCheck(checkEmail):
        return jsonify({"error": "Email "+ checkEmail +" has already been used to create an account"}), 400
    
    # valid username/email entered
    print("Check Results : No dublicates found")
    
    station = Station(
        firstName = stationData['firstName'],
        lastName = stationData['lastName'],
        username = stationData['username'].lower(),
        channelName = stationData['channelName'],
        streamUrl = stationData['streamUrl'].lower(),
        email = stationData['email'].lower(),
        password = stationData['password'],
        logo =stationData['logo'],
        live = 0,
        tagLine =stationData['tagLine'],
        bio = stationData['bio']
    )

    database.session.add(station)
    database.session.commit()

    return jsonify({'message':'Station Registered'})

@registrationBP.route('/register/user', methods=['POST'])
def registerUser():
    userData = request.get_json()

    # check if username is in use
    checkUsername = userData.get('username').lower()
    checkEmail = userData.get('email').lower()

    if usernameCheck(checkUsername):
        return jsonify({"error": "Username "+ checkUsername +" already in use"}), 400
    
    if emailCheck(checkEmail):
        return jsonify({"error": "Email "+ checkEmail +" has already been used to create an account"}), 400
    
    # valid username/email entered
    print("Check Results : No dublicates found")

    user = User(
        firstName = userData['firstName'].lower(),
        lastName = userData['lastName'].lower(),
        username = userData['username'].lower(),
        email = userData['email'].lower(),
        password = userData['password']
    )

    database.session.add(user)
    database.session.commit()

    return jsonify({'message':'User Registered'})
