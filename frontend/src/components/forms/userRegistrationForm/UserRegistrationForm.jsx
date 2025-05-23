import React, { useState } from 'react';

import './UserRegistrationFormStyle.css'

import CheckEmpty from '../../../utilities/checkEmpty';

export default function UserRegistrationForm({ detectInputs }) {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    });
  
  const updateInputs = (eInput) => {
    const { name, value } = eInput.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (eSubmit) => {
    eSubmit.preventDefault();

    const missingField = CheckEmpty(formInputs, [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
    ]);

    //check all fields have been entered 
    if (missingField) {
      console.log(`Missing ${missingField}`);
      alert(`Please complete all fields`);
      return;
    }

    try {
      const reponse = await fetch(
        'http://localhost:5001/register/user', {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(formInputs)
        });
      
      const result = await reponse.json();

      if(reponse.ok){
        console.log('User regsitered in database');
      } else {
        console.log('Error');
      }
    } catch(error) {
      console.log('error')
    }
  };
    return(
        <div className="userForm">
            <h1>Details</h1>
            <form className="userData" onSubmit={submitForm}>
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