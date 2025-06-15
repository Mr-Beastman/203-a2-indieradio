from flask import Blueprint,request,Response, jsonify
import requests

audioPlayerBP = Blueprint('audioPlayerBP', __name__)

# quick coded media player to handle display and streaming for testing purposes.
# most code is now redundent as we are pulling from the database. Will need to review what can be taken.

@audioPlayerBP.route('/nowPlaying')

def nowPlaying():
    streamUrl = request.args.get('streamUrl')
    headers = {'Icy-Metadata': '1',
                'User-Agent': 'WinampMPEG/5.09',
                'Accept': '*/*',}
    
    try:
        response = requests.get(streamUrl, headers = headers, stream=True, timeout=5)
        metaintHeader = response.headers.get('icy-metaint')

        if metaintHeader is None:
            print("No metadata available")
            return jsonify({'title': None, 'message': 'No metadata available'}), 200
    
        metaint = int(metaintHeader)
        stream = response.raw

        # skipping audio data
        stream.read(metaint)
        metadataLen = ord(stream.read(1)) * 16

        if metadataLen > 0:
            metadata = stream.read(metadataLen).decode('utf-8', errors='ignore')
            for piece in metadata.split(';'):
                if piece.strip().startswith("StreamTitle"):
                    title = piece.split('=')[1].strip(" ' ")
                    return jsonify({'title': title})

        return jsonify({'title': None})
    
    except Exception as error:
        print(f"Failed to get current song : {error}")
        return jsonify({'error' : 'Faild to get Metadata'}), 500