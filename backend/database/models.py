from database.database import database

class Artist(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    firstName = database.Column(database.String(100))
    lastName = database.Column(database.String(100))
    username = database.Column(database.String(100), unique=True)
    channelName = database.Column(database.String(100))
    stream = database.Column(database.String(255))
    email = database.Column(database.String(100), unique=True)
    password = database.Column(database.String(100))

class User(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    first_name = database.Column(database.String(100))
    last_name = database.Column(database.String(100))
    username = database.Column(database.String(100), unique=True)
    email = database.Column(database.String(100), unique=True)
    password = database.Column(database.String(100))