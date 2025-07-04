// react
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthenticationContext';

// style sheet
import './LoginFormStyle.css'

// import ultilities
import * as utilities from '../../../utilities/utilities';

export default function LoginForm() {
  const navigate = useNavigate();
  const { logIn } = useAuth();

  // state to store inputs and keep code/ui synced
  const [formInputs, setFormInputs] = useState({username:'',password:''});

  // set error state to be updated if applicable
  const [errorMessage, setErrorMessage] = useState('')

  const onInputUpdate = (enterInput) => {
    const {name, value} = enterInput.target;
    setFormInputs(previous => ({...previous, [name]:value}));
  };

  // connect submit button to backend logic
  const onInputSubmit = async (eSubmit) => {
    eSubmit.preventDefault();

    //checking that all fields have been entered
    const missingField = utilities.CheckEmpty(formInputs, 'login');

    if (missingField) {
      console.log(`Missing ${missingField}`);
      setErrorMessage('Please enter all fields')
      return;
    }

    // sending to backend for auth
    try{
      const result = await utilities.postData('http://localhost:5001/authentication/login', formInputs)

      if (result.success){
        setErrorMessage('')

        //storing user token and update state
        logIn(result.authToken)

        const loggedIn = utilities.getCurrentUser()

        console.log(loggedIn.userType)

        if(loggedIn.userType === "station"){
          navigate('/stationDashboard')
        } else {
          navigate('/userDashboard')
        }     

        
      } else {
        console.error('login failed', result.message)
        setErrorMessage(result.message)
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
      
      {/* display error message to user */}
      <div className="errorDisplay"><p>{errorMessage}</p></div>

    </div>
  )
}
