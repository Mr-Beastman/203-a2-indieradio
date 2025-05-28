// react and hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// style sheet
import './UserRegistrationFormStyle.css'

// utilities
import * as utilities from '../../../utilities/utilities';


export default function UserRegistrationForm({ detectInputs }) {
  
  // state to store inputs and keep code/ui synced
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    });
  
  // set error state to be updated if applicable
  const [errorMessage, setErrorMessage] = useState('')

  // setting to allow for redirect on register
  const navigate = useNavigate()

  const updateInputs = (eInput) => {
    const { name, value } = eInput.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (eSubmit) => {
    eSubmit.preventDefault();

    //checking all fields have been entered
    const missingField = utilities.CheckEmpty(formInputs, [
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
      const response = await utilities.postData('http://localhost:5001/register/user', formInputs)

      if(response.ok){
        console.log('Success : User regsitered in database');
        // clearing error messagae on access
        setErrorMessage('')
        // on success navigate to login
        navigate("/login")
      } else {
        setErrorMessage(response.error || 'Unable to Register')
        console.log(errorMessage)
      }
    } catch(error) {
      setErrorMessage('Server error: could not connect');
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

            <div className="errorDisplay"><p>{errorMessage}</p></div>
        </div>
    )
}