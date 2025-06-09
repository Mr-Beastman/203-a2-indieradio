from flask import Blueprint, request, jsonify
from database.models import database, Station, User

from modules.utilities.utilities import usernameCheck, emailCheck

#blueprint for authentication
authenticationBP = Blueprint("authenticationBP", __name__)

@authenticationBP.route('/authentication/login', methods=['POST'])
def login():
    loginDetails = request.get_json()

    # default usertype is artist
    userType = "station"

    # check if username exists
    checkUsername = loginDetails.get('username').lower()

    if not usernameCheck(checkUsername):
        return jsonify({"success" : False, "message" : "No account with that username"})
    
    # if account is valid, grab account details
    account = database.session.query(Station).filter_by(username=checkUsername).first()

    # if station account not found, query userData
    if not account:
        account = database.session.query(User).filter_by(username=checkUsername).first()
        userType = "listener"

    # will need a check here for admin

    # check password entered matches that in database
    enteredPassword = loginDetails.get('password')

    if enteredPassword == account.password:
        #return success
        return jsonify({
            "success" : True,
            "message" : "Login Successful",
            "userType" : userType,
            "username" : account.username
        })
    else :
        # return fail
        return jsonify({
            "success" : False,
            "message" : "Incorrect username and password combination"
        })