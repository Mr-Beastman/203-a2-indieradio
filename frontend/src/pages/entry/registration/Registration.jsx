// react
import React, { useState } from 'react';

// react icons
import { RiHeadphoneLine } from "react-icons/ri";
import { IoMusicalNotesOutline } from "react-icons/io5";

// style
import './RegistrationStyle.css';

// components
import UserRegistrationForm from '../../../components/forms/userRegistrationForm/UserRegistrationForm';
import StationRegistrationForm from '../../../components/forms/stationRegistrationForm/StationRegistrationForm';

// page
export default function Registration() {
    const [userType, setUserType] = useState('user');

    // background imahes for dynamic switching
    const djBack = 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    const listenerBack = 'https://images.unsplash.com/photo-1615554851544-e6249b92a492?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    // page specific functions, to switch between registration forms
    const openUserForm = () => {
        console.log('opening user registration form');
        setUserType('user');
    };

    const openStationForm = () => {
        console.log('opening station registration form');
        setUserType('station');
    };

    //allow for background switching
    const backgroundImage =
        userType === 'station' ? `url(${djBack})`: 
        userType === 'user' ? `url(${listenerBack})`
        : '';

    return (
        // inline style done here to allow for dynamic background switching 
        <div className="pagebackground"   style={{
                minHeight: '100vh',
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                paddingTop: '2rem',
                paddingBottom: '2rem'
        }}>
            <div className="pageContents">
                <h2>Registration Type</h2>
                <div className="selectionButtons">
                    <button onClick={openUserForm}className={`selectButton ${userType === 'user' ? 'active' : ''}`}> <RiHeadphoneLine /> Listener </button>
                    <button onClick={openStationForm} className={`selectButton ${userType === 'station' ? 'active' : ''}`}> <IoMusicalNotesOutline/> Station</button>
                </div>

                <div className="formContainer">
                    {userType === 'user' && <UserRegistrationForm/>}
                    {userType === 'station' && <StationRegistrationForm />}
                </div>

            </div>
        </div>
    );
}
