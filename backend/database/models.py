from database.database import database

class Artist(database.Model):
    __tablename__ = 'artistData'

    id = database.Column(database.Integer, primary_key=True)
    firstName = database.Column(database.String(100))
    lastName = database.Column(database.String(100))
    username = database.Column(database.String(100), unique=True, nullable=False)
    channelName = database.Column(database.String(100))
    streamUrl = database.Column(database.String(255))
    email = database.Column(database.String(100), unique=True, nullable=False)
    password = database.Column(database.String(100), nullable=False)
    logo = database.Column(database.String(100))
    live = database.Column(database.Integer)

class User(database.Model):
    __tablename__ = 'userData'

    username = database.Column(database.String(100), nullable=False, primary_key=True, unique=True)
    firstName = database.Column(database.String(100))
    lastName = database.Column(database.String(100))
    email = database.Column(database.String(100), nullable=False, unique=True)
    password = database.Column(database.String(100), nullable=False)