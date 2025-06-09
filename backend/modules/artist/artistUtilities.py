from flask import jsonify

# build list from route query
def buildList(djs):
    # create list to hold stations
    djList = []

    # populate list
    for dj in djs:
        djList.append({
            "id" : dj.id,
            "name" : dj.name,
            "bio" : dj.bio,
            "display" : dj.displayPicture,
            "demo" : dj.demoVideo
        })

    return jsonify(djList)