from flask import jsonify

# build list from route query
def buildList(artists):
    # create list to hold stations
    artistList = []

    # populate list
    for artist in artists:
        artistList.append({
            "id" : artist.id,
            "name" : artist.name,
            "bio" : artist.bio,
            "display" : artist.displayPicture,
            "demo" : artist.demoVideo
        })

    return jsonify(artistList)