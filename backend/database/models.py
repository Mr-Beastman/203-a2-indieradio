from datetime import datetime
from sqlalchemy.orm import relationship
from database.database import database

class Station(database.Model):
    __tablename__ = 'stationData'

    id = database.Column(database.Integer, primary_key=True)
    username = database.Column(database.String(100), unique=True, nullable=False)
    channelName = database.Column(database.String(100))
    streamUrl = database.Column(database.String(255))
    email = database.Column(database.String(100), unique=True, nullable=False)
    password = database.Column(database.String(100), nullable=False)
    logo = database.Column(database.String(100))
    live = database.Column(database.Integer)
    tagLine = database.Column(database.String(255))
    bio = database.Column(database.String(255))

class User(database.Model):
    __tablename__ = 'userData'

    username = database.Column(database.String(100), nullable=False, primary_key=True, unique=True)
    firstName = database.Column(database.String(100))
    lastName = database.Column(database.String(100))
    email = database.Column(database.String(100), nullable=False, unique=True)
    password = database.Column(database.String(100), nullable=False)

class Artist(database.Model):
    __tablename__ = 'artistData'

    id = database.Column(database.Integer, primary_key=True)
    name = database.Column(database.String(100))
    bio = database.Column(database.String(255))
    displayPicture = database.Column(database.String(255))
    demoVideo = database.Column(database.String(255))

class ChatMessage(database.Model):
    __tablename__ = 'chatMessages'

    id = database.Column(database.Integer, primary_key=True, autoincrement=True)
    stationId = database.Column(database.String, nullable=False)
    username = database.Column(database.String, nullable=False)
    message = database.Column(database.Text, nullable=False)
    timestamp = database.Column(database.DateTime, default=datetime.utcnow, nullable=False)

class UserSubscriptions(database.Model):
    __tablename__= 'userSubscriptions'
    
    username = database.Column(database.String, database.ForeignKey('userData.username'), primary_key=True)
    stationId = database.Column(database.Integer, primary_key=True)

class Show(database.Model):
    __tablename__ = 'showData'

    id = database.Column(database.Integer, primary_key=True, autoincrement=True)
    stationId = database.Column(database.Integer, database.ForeignKey('stationData.id'), nullable=False)
    artistName = database.Column(database.String, nullable=False)
    title = database.Column(database.String(100), nullable=False)
    description = database.Column(database.Text)
    startTime = database.Column(database.DateTime, nullable=False)
    endTime = database.Column(database.DateTime, nullable=True)
    station = relationship('Station', backref='shows')