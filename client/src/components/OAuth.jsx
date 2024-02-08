import React from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    //create dispatch to dispatch actions to the store 
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
        //create google auth provider 
      const provider = new GoogleAuthProvider();
      //get the auth instance from the app 
      const auth = getAuth(app);
        //sign in with google popup 
      const result = await signInWithPopup(auth, provider)
      //send the user data to the backend to create a new user or sign in the user 
      const res = await fetch('/backend/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // get the data from the backend 
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log('could not login with google', error)
    }
  }

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
  )
}