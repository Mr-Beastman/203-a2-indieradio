import React, { useState } from 'react';

// import react icons
import { RiHeadphoneLine } from "react-icons/ri";
import { IoMusicalNotesOutline } from "react-icons/io5";



import './RegistrationStyle.css';
import UserRegistrationForm from '../../../components/forms/userRegistrationForm/UserRegistrationForm';
import ArtistRegistrationForm from '../../../components/forms/artistRegistrationForm/ArtistRegistrationForm';

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

    return (
        <div className="pageContents">
            <h2>Registration Type</h2>
            <div className="selectionButtons">
                <button onClick={openUserForm}> <RiHeadphoneLine /> Listener </button>
                <button onClick={openArtistForm}> <IoMusicalNotesOutline/> Artist</button>
            </div>

            <div className="formContainer">
                {userType === 'user' && <UserRegistrationForm/>}
                {userType === 'artist' && <ArtistRegistrationForm />}
            </div>

        </div>
    );
}
