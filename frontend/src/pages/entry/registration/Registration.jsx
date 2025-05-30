// react
import React, { useState } from 'react';

// react icons
import { RiHeadphoneLine } from "react-icons/ri";
import { IoMusicalNotesOutline } from "react-icons/io5";

// images
import djBack from './images/matty-adame-nLUb9GThIcg-unsplash.jpg'
import listenerBack from './images/viktor-forgacs-B88PgQXS4qg-unsplash.jpg'

// style
import './RegistrationStyle.css';

// components
import UserRegistrationForm from '../../../components/forms/userRegistrationForm/UserRegistrationForm';
import ArtistRegistrationForm from '../../../components/forms/artistRegistrationForm/ArtistRegistrationForm';

// page
export default function Registration() {
    const [userType, setUserType] = useState('user');

    // page specific functions, to switch between registration forms
    const openUserForm = () => {
        console.log('opening user registration form');
        setUserType('user');
    };

    const openArtistForm = () => {
        console.log('opening artist registration form');
        setUserType('artist');
    };

    //allow for background switching
    const backgroundImage =
        userType === 'artist' ? `url(${djBack})`: 
        userType === 'user' ? `url(${listenerBack})`
        : '';

    return (
        // inline style done here to allow for dynamic background switching 
        <div className="pagebackground"   style={{
                height: '100vh',
                width: '100%',
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden'
        }}>
            <div className="pageContents">
                <h2>Registration Type</h2>
                <div className="selectionButtons">
                    <button onClick={openUserForm}className={`selectButton ${userType === 'user' ? 'active' : ''}`}> <RiHeadphoneLine /> Listener </button>
                    <button onClick={openArtistForm} className={`selectButton ${userType === 'artist' ? 'active' : ''}`}> <IoMusicalNotesOutline/> Artist</button>
                </div>

                <div className="formContainer">
                    {userType === 'user' && <UserRegistrationForm/>}
                    {userType === 'artist' && <ArtistRegistrationForm />}
                </div>

            </div>
        </div>
    );
}
