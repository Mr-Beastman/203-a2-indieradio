from flask import Blueprint, jsonify
from flask_socketio import join_room, leave_room, emit
from database.database import database
from database.models import ChatMessage
import datetime

chatBP = Blueprint('chat', __name__)

@chatBP.route('/chat/<stationId>', methods=['GET'])
def getChatHistory(stationId):
    messages = ChatMessage.query.filter_by(stationId=stationId).order_by(ChatMessage.timestamp).all()
    return jsonify([
        {
            "user": msg.username,
            "message": msg.message,
            "timestamp": msg.timestamp.isoformat()
        }
        for msg in messages
    ])

def register_socketio_handlers(socketIo):
    @socketIo.on('joinStation')
    def joinStation(data):
        stationId = data.get('stationId')
        if stationId:
            join_room(stationId)
            emit('status', {'msg': f'User has joined station {stationId}'}, room=stationId)

    @socketIo.on('leaveStation')
    def leaveStation(data):
        stationId = data.get('stationId')
        if stationId:
            leave_room(stationId)
            emit('status', {'msg': f'User has left station {stationId}'}, room=stationId)

    @socketIo.on('sendMessage')
    def sendMessage(data):
        stationId = data.get('stationId')
        username = data.get('username')
        message = data.get('message')
        if not all([stationId, username, message]):
            return

        newMessage = ChatMessage(
            stationId=stationId,
            username=username,
            message=message,
            timestamp=datetime.datetime.utcnow()
        )
        database.session.add(newMessage)
        database.session.commit()

        emit('receiveMessage', {
            'stationId': stationId,
            'user': username,
            'message': message,
            'timestamp': newMessage.timestamp.isoformat()
        }, room=stationId)
