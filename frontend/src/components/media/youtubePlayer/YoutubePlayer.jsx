import React from 'react'

//importing style sheet
import './YoutubePlayerStyle.css'

// display embedded youtube video
export default function YoutubePlayer({url}) {

    if (!url) return <p>Invalid or missing YouTube URL</p>;

    return (
        <div className="card video-container">
        <iframe
            src={url}
            title ='youtube player'
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        </div>
    )
}
