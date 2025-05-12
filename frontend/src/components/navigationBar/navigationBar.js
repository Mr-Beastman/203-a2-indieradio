import React from 'react'

// importing style sheet
import './NavigationBarStyle.css'

//importing display icons
import { MdAccountCircle } from "react-icons/md";

export default function NavigationBar() {
  return (
        <div className="navBar">
            <div className="logo">
                <h1>Indie Radio.</h1>
            </div>
            <ul className="navMenu">
                <li><a href="#">Steam</a></li>
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
