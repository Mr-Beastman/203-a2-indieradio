# from flask import Blueprint, jsonify, current_app
# from database.models import User

# # create BP
# listenerBP = Blueprint('listener', __name__)

# # get lsiterner info from username
# @listenerBP.route('/listener/<username>', methods =['GET'])
# def getStationById(username):
#     listener = User.query.filter_by(username=username).first()

#     listenerData = {
#         'username': listener.username,
#         'firstName': listener.firstName,
#         'lastName': listener.lastName,
#         'email': listener.email
#     }

#     return jsonify(listenerData)