// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Optional: only if you're actually using analytics
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDb6zdzN6u4obycnphpiQ8ySRCyMkNoRmg",
  authDomain: "radio-e65d4.firebaseapp.com",
  projectId: "radio-e65d4",
  storageBucket: "radio-e65d4.appspot.com",
  messagingSenderId: "613979920252",
  appId: "1:613979920252:web:22908752c902462a01b6f9",
  measurementId: "G-83CENWY8Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only call analytics if you're using it
// You can delete the line below if you don't use analytics
const analytics = getAnalytics(app);

export const auth = getAuth(app);
