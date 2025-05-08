async function updateTrackTitle() {
    try {
      const res = await fetch("/now-playing");
      const data = await res.json();
      document.getElementById("track-title").textContent = data.title || "Live Stream";
    } catch (err) {
      console.log("Unable to fetch track info");
    }
  }
  
  setInterval(updateTrackTitle, 5000); // Update every 5 sec
  updateTrackTitle();
  