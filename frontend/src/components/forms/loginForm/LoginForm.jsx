import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';


// import ultilities
import CheckEmpty from '../../../utilities/checkEmpty';

export default function LoginForm() {

  // state to store inputs and keep code/ui synced
  const [formInputs, setFormInputs] = useState({username:'',password:''});

  const onInputUpdate = (enterInput) => {
    const {name, value} = enterInput.target;
    setFormInputs(previous => ({...previous, [name]:value}));
  };

  // connect submit button to backend logic
  const onInputSubmit = async (eSubmit) => {
    eSubmit.preventDefault();

    //checking that all fields have been entered
    const missingField = CheckEmpty(formInputs, ['username', 'password']);

    if (missingField) {
      console.log(`Missing ${missingField}`);
      return;
    }

    // sending to backend for auth
    try{
      const response = await fetch(
        'http://localhost:5001/authentication/login', {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify(formInputs)
        });
      
      const result = await response.json();

      if (result.success){
        alert(`Succesful Login for ${result.username} with the user type ${result.userType}
          \nDashboards currently underconstruction`)
      } else {
        console.error('login failed', result.message)
      }

    } catch(error) {
      console.log("Cant access database", error)
    }
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
