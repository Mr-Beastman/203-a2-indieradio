import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

// import hooks
import CheckEmpty from '../../../utilities/checkEmpty';

export default function LoginForm() {

  // state to store inputs and keep code/ui synced
  const [formInputs, setFormInputs] = useState({username:'',password:''});

  const onInputUpdate = (enterInput) => {
    const {name, value} = enterInput.target;
    setFormInputs(previous => ({...previous, [name]:value}));
  };

  const onInputSubmit = async (e) => {
    e.preventDefault();

    const missingField = CheckEmpty(formInputs, ['username', 'password']);

    if (missingField) {
      console.log(`Missing ${missingField}`);
      return;
    }

    // testing success
    console.log('Submitting login', formInputs);
  };

  //visual elements of componet
  return (
    <div className="loginForm">

      <h1 className="title">Login</h1>

      <form className='loginData' onSubmit={onInputSubmit}>
        <label>Username:<input type="text" name='username' value={formInputs.username} onChange={onInputUpdate}/></label>  
        <label>Password:<input type="password" name='password' value={formInputs.password} onChange={onInputUpdate}/></label>
        <button className="submitButton">Submit</button>  
      </form>

      <NavLink to="/register" className="register">Register New Account</NavLink>

    </div>
  )
}
