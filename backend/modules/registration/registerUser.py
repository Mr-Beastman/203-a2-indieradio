from flask import Blueprint, request, jsonify
from database.models import database, User

registerUserBP = Blueprint('registerUserBP', __name__)

@registerUserBP.route('/register/user', methods=['POST'])
def registerUser():
    userData = request.get_json()

    user = User(
        firstName = userData['firstName'],
        lastName = userData['lastName'],
        username = userData['username'],
        channelName = userData['channelName'],
        streamUrl = userData['streamUrl'],
        email = userData['email'],
        password = userData['password']
    )

    database.session.add(user)
    database.session.commit()

    return jsonify({'message':'User Registered'})