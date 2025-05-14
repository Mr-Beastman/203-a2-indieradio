const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS so React frontend can fetch from here
app.use(cors());

app.get('/nowPlaying', (req, res) => {
  res.json({
    name: 'Indie Radio',
    logo: 'https://via.placeholder.com/120x120.png?text=Indie+Radio',
    current_song: 'Live DJ Set with Nova',
    stream_url: 'https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
    homepage: 'https://indieradio.com',
    genre: 'Indie / R&B',
    language: 'English'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
