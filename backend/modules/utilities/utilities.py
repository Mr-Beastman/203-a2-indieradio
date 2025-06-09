from database.models import database, Station, User

## check database if username in use across both tables
## arguments : username to check
## retunrs : True/False
def usernameCheck(username):
    stationUsername =  database.session.query(Station).filter_by(username=username).first() is not None
    userUsername =  database.session.query(User).filter_by(username=username).first() is not None

    if(stationUsername or userUsername):
        return True
    else:
        return False

## check database if email in use across both tables
## arguments : email check
## retunrs : True/False
def emailCheck(email):
    stationEmail= database.session.query(Station).filter_by(email=email).first() is not None
    userEmail = database.session.query(User).filter_by(email=email).first() is not None
    

    if(stationEmail or userEmail):
        return True
    else:
        return False