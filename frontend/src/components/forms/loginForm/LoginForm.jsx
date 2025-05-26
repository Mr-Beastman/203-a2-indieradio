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

  // connect submit button to backend logic
  const onInputSubmit = async (e) => {
    e.preventDefault();

    //checking that all fields have been entered
    const missingField = CheckEmpty(formInputs, ['username', 'password']);

    if (missingField) {
      console.log(`Missing ${missingField}`);
      return;
    }

    // temporay testing success message
    console.log('Submitting login', formInputs);
  };

  //visual elements of componet
  return (
    <div className="loginForm">

      <h1 className="title">Sign In</h1>
      <p>Don't have an account? <NavLink to="/register" className="register">Sign Up</NavLink></p>

      <form className='loginData' onSubmit={onInputSubmit}>
        <label>Username:<input type="text" name='username' value={formInputs.username} onChange={onInputUpdate}/></label>  
        <label>Password:<input type="password" name='password' value={formInputs.password} onChange={onInputUpdate}/></label>
        <button className="submitButton">Login</button>  
      </form>

{/*   section to later add google login      
      <p>------------ or ------------</p> 
      */}

    </div>
  )
}
