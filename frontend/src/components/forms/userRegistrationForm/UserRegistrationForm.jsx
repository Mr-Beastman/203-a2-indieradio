import React from "react"

import './UserRegistrationFormStyle.css'

export default function UserRegistrationForm({ formInputs, detectInputs}) {
    return(
        <div className="userForm">
            <h1>Details</h1>
            <form action="" className="userData">
                <label>First Name: <input type="text"/></label>
                <label>Last Name: <input type="text"/></label>
                <label>Username: <input type="text"/></label>
                <label>Email: <input type="text"/></label>
                <label>Password: <input type="text"/></label>
                <button>Submit</button>
            </form>
        </div>
    )
}