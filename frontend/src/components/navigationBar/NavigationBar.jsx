import React from 'react'
import { Link } from 'react-router-dom';

// importing style sheet
import './NavigationBarStyle.css'

//importing display icons
import { MdAccountCircle } from "react-icons/md";

export default function NavigationBar() {
  return (
        <div className="navBar">
            <div className="logo">
                <h1><Link to="/">Indie Radio.</Link></h1>
            </div>
            <ul className="navMenu">
                <li><Link to="/artist">Stream</Link></li>
                <li><a href="#">Schedule</a></li>
                <li><a href="#">On Demand</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div className="navIcons">
                <MdAccountCircle className="icon"/>
            </div>
        </div>
  )
}

