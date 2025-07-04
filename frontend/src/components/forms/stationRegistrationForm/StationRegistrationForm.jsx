// react and hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// style sheet
import './StationRegistrationStyle.css';

// utilities
import * as utilities from '../../../utilities/utilities';

export default function ArtistRegistrationForm() {
  const [formInputs, setFormInputs] = useState({
    // firstName: '',
    // lastName: '',
    username: '',
    channelName: '',
    streamUrl: '',
    email: '',
    password: '',
    logo: '',
    tagLine: '',
    bio: ''
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

    const missingField = utilities.CheckEmpty(formInputs, 'station');

    //check all fields have been entered 
    if (missingField) {
      console.log(`Missing ${missingField}`);
      setErrorMessage('Please complete all fields')
      return;
    }

    try {
      // post formInputs and check response
      const reponse = await fetch( 
        'http://localhost:5001/register/station', {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(formInputs)
        });
      
      const result = await reponse.json();

      if(reponse.ok){
        console.log('Success : Artist regsitered in database');
        //clearing error messgae on access
        setErrorMessage('')
        navigate("/login")
      } else {
        setErrorMessage(result.error || 'Unable to Register')
        console.log(errorMessage)
      }
    } catch(error) {
      setErrorMessage('Server error: could not connect');
    }
  };

  return (
    <div className="component">
      <h1>Details</h1>
      <form className="inputForm" onSubmit={submitForm}>
        {/* <label>First Name: <input type="text" name="firstName" value={formInputs.firstName} onChange={updateInputs} /></label>
        <label>Last Name: <input type="text" name="lastName" value={formInputs.lastName} onChange={updateInputs} /></label> */}
        <label>Username: <input type="text" name="username" value={formInputs.username} onChange={updateInputs} /></label>
        <label>Channel Name: <input type="text" name="channelName" value={formInputs.channelName} onChange={updateInputs} /></label>
        <label>Stream Url: <input type="text" name="streamUrl" value={formInputs.streamUrl} onChange={updateInputs} /></label>
        <label>Email: <input type="text" name="email" value={formInputs.email} onChange={updateInputs} /></label>
        <label>Password: <input type="password" name="password" value={formInputs.password} onChange={updateInputs} /></label>
        <label>Logo Url: <input type="logo" name="logo" value={formInputs.logo} onChange={updateInputs} /></label>
        <label>Tag Line: <input type="tagLine" name="tagLine" value={formInputs.tagLine} onChange={updateInputs} /></label>
        <label>Sation Bio: <input type="bio" name="bio" value={formInputs.bio} onChange={updateInputs} /></label>
        <button type="submit">Submit</button>
      </form>

      {/* display error message to user */}
      <div className="errorDisplay"><p>{errorMessage}</p></div>

    </div>
  );
}
