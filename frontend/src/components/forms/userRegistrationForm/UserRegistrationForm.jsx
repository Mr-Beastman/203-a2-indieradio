import React, { useState } from 'react';

import './UserRegistrationFormStyle.css'

import CheckEmpty from '../../../utilities/checkEmpty';

export default function UserRegistrationForm({ detectInputs }) {
  
  // state to store inputs and keep code/ui synced
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

    //checking all fields have been entered
    const missingField = CheckEmpty(formInputs, [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
    ]);

    if (missingField) {
      console.log(`Missing ${missingField}`);
      alert(`Please complete all fields`);
      return;
    }

    // try to connect 
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
      console.log('Error : Unable to connect to database')
    }
  };
    return(
        <div className="userForm">
            <h1>Details</h1>
            <form className="userData" onSubmit={submitForm}>
                <label>First Name: <input type="text" name="firstName" value={formInputs.firstName} onChange={updateInputs}/></label>
                <label>Last Name: <input type="text" name="lastName"value={formInputs.lastName} onChange={updateInputs}/></label>
                <label>Username: <input type="text" name="username" value={formInputs.username} onChange={updateInputs}/></label>
                <label>Email: <input type="text" name="email" value={formInputs.email} onChange={updateInputs}/></label>
                <label>Password: <input type="text" name="password" value={formInputs.password} onChange={updateInputs}/></label>
                <button>Submit</button>
            </form>
        </div>
    )
}