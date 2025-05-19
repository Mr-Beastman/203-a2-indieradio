import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { auth } from '../../firebase'; // <- correct relative path

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for the password reset link.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={handleReset}>
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}
