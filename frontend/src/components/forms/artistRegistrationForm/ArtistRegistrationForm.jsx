import React, { useState } from 'react';
import './ArtistRegistrationStyle.css';
import CheckEmpty from '../../../utilities/checkEmpty';

export default function ArtistRegistrationForm() {
  const [formInputs, setFormInputs] = useState({
    firstName: '',
    lastName: '',
    username: '',
    channelName: '',
    streamUrl: '',
    email: '',
    password: '',
  });

  const updateInputs = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (eSubmit) => {
    eSubmit.preventDefault();

    const missingField = CheckEmpty(formInputs, [
      'firstName',
      'lastName',
      'username',
      'channelName',
      'streamUrl',
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
        'http://localhost:5001/register/artist', {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(formInputs)
        });
      
      const result = await reponse.json();

      if(reponse.ok){
        console.log('Artist regsitered in database');
      } else {
        console.log('Error');
      }
    } catch(error) {
      console.log('fucked it')
    }
  };

  return (
    <div className="component">
      <h1>Details</h1>
      <form className="inputForm" onSubmit={submitForm}>
        <label>First Name: <input type="text" name="firstName" value={formInputs.firstName} onChange={updateInputs} /></label>
        <label>Last Name: <input type="text" name="lastName" value={formInputs.lastName} onChange={updateInputs} /></label>
        <label>Username: <input type="text" name="username" value={formInputs.username} onChange={updateInputs} /></label>
        <label>Channel Name: <input type="text" name="channelName" value={formInputs.channelName} onChange={updateInputs} /></label>
        <label>Stream Url: <input type="text" name="streamUrl" value={formInputs.stream} onChange={updateInputs} /></label>
        <label>Email: <input type="text" name="email" value={formInputs.email} onChange={updateInputs} /></label>
        <label>Password: <input type="password" name="password" value={formInputs.password} onChange={updateInputs} /></label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
