from database.models import database, Artist, User

## check database if username in use across both tables
## arguments : username to check
## retunrs : True/False
def usernameCheck(username):
    artistUsername =  database.session.query(Artist).filter_by(username=username).first() is not None
    userUsername =  database.session.query(User).filter_by(username=username).first() is not None

    if(artistUsername or userUsername):
        return True
    else:
        return False

## check database if email in use across both tables
## arguments : email check
## retunrs : True/False
def emailCheck(email):
    artistEmail= database.session.query(Artist).filter_by(email=email).first() is not None
    userEmail = database.session.query(User).filter_by(email=email).first() is not None
    

    if(artistEmail or userEmail):
        return True
    else:
        return False