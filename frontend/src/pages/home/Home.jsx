import React from 'react'

// importing style sheet and images
import './Home.css'

// import components 
import AudioPlayer from '../../components/audioPlayer/AudioPlayer';
import YoutubePlayer from '../../components/youtubePlayer/YoutubePlayer';

export default function Home() {
  return (
    <div className="homePage">

      <div className="media">
        <div className="leftContent">
          <AudioPlayer/>
        </div>
        <div className="rightContent">
          <YoutubePlayer/>
        </div>
      </div>
    </div>
  );
}
