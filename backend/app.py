from flask import Flask, render_template, jsonify
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/now-playing")
def now_playing():
    try:
        # Fetch now playing info from Icecast
        res = requests.get("http://localhost:8000/status-json.xsl")
        data = res.json()
        title = data["icestats"]["source"]["title"]
        return jsonify({"title": title})
    except Exception as e:
        print("Error getting track title:", e)
        return jsonify({"title": "Live Stream"})

if __name__ == "__main__":
    app.run(debug=True)
