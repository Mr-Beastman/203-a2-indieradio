import React from 'react'

//importing style sheet
import './YoutubePlayerStyle.css'

// display embedded youtube video
export default function YoutubePlayer() {
    return (
        <div className="card video-container">
        <iframe
            src="https://www.youtube.com/embed/36YnV9STBqc?autoplay=1"
            title="The Good Life Radio"
            // removed auto play to avoid multiply sound sources on load
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>
    )
}
