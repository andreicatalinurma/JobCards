import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    //selecting the current user from the redux store 
    const {currentUser} = useSelector(state => state.user);
    //if the user is signed in, render the outlet, else redirect to the sign in page
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}