from flask import Blueprint, request, jsonify
from database.models import  database, UserSubscriptions, Station

from modules.station.stationUtilities import buildList



subscriptionBP = Blueprint('subscriptions', __name__)

@subscriptionBP.route('/subscriptions/checkSubscriptions', methods=['GET'])
def checkSubscriptions():
    username = request.args.get('username')
    stationId = request.args.get('stationId')

    if not username or not stationId:
        return(jsonify({'Error : Invalid/Missing details'}))
    
    subscribed = UserSubscriptions.query.filter_by(username=username, stationId=stationId).first()

    return jsonify({'subscribed': subscribed is not None})

@subscriptionBP.route('/subscriptions/addSubscription', methods=['POST'])
def addSubscription():
    data = request.json
    username = data.get('username')
    stationId = data.get('stationId')

    new_sub = UserSubscriptions(username=username, stationId=stationId)
    database.session.add(new_sub)
    database.session.commit()

    return jsonify({'message': 'Subscription added'})

@subscriptionBP.route('/subscriptions/removeSubscription', methods=['POST'])
def removeSubscription():
    data = request.json
    username = data.get('username')
    stationId = data.get('stationId')

    if not username or not stationId:
        return jsonify({'error': 'Missing username or stationId'}), 400

    subscription = UserSubscriptions.query.filter_by(username=username, stationId=stationId).first()

    database.session.delete(subscription)
    database.session.commit()

    return jsonify({'message': 'Subscription removed'})

@subscriptionBP.route('/subscriptions/getUserSubscriptions', methods=['GET'])
def getUserSubscriptions():
    username = request.args.get('username')

    subscriptions = UserSubscriptions.query.filter_by(username=username).all()
    stationIds = [sub.stationId for sub in subscriptions]
    stations = Station.query.filter(Station.id.in_(stationIds)).all()

    return buildList(stations)