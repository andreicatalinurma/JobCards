import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  //selecting the current user from the redux store
  const {currentUser} = useSelector(state => state.user);
  return (
    
    <div className='bg-slate-400'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            {/*Redirects to the home page without refreshing it */}
            <Link to='/'>
                <h1 className='font-bold'>Job Cards</h1>
            </Link>
            <ul className='flex font-bold gap-4'>
                 <Link to='/'><li>About</li></Link>
                {currentUser ? <Link to='/jobcards'><li>JobCards {currentUser.username}</li></Link> : null}
                <Link to='/profile'>
                {currentUser ? (
                  <img src = {currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                  ) : (
                    <li>Sign In</li>  
                )}
                </Link>
            </ul>
        </div>
    </div>
  )
}
