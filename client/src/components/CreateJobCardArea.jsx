import React, { useState } from 'react';
import { useSelector } from 'react-redux';


export default function CreateJobCardArea() {
    //selecting the current user from the redux store
    const {currentUser} = useSelector(state => state.user);

  // State to store the job details from the input
    const [job, setJob] = useState({
        user: currentUser.username,
        title: '',
        details: '',
        completed: false
    });

    function handleChange(e) {
       // Destructuring the name and value properties off of event.target
       const { name, value } = e.target;
       // Updating the input's state
       setJob(prevJob => {
           return {
               ...prevJob,

               [name]: value
           };
       });
    }
    
    async function  submitJob(e)  {
      e.preventDefault();
      try {
        //send a post request to the server to add the job to the database
          if(job.title !== '' && job.details !== '') {
            const response = await fetch(`/backend/job/submitjob/${currentUser.username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(job)
          });

          const data = await response.json();
          //if the job has been added, clear the input fields
          if(data === 'Job has been added') {
            setJob({
              title: '',
              details: '',
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    

  return (
    <div>
      <form className='relative bg-white max-w-lg p-4 mx-auto my-8 rounded-lg shadow-lg'>
        <input className='w-full border-none resize-none p-1 outline-none text-3xl font-bold font-serif' 
        id='title'
        name='title' 
        onChange={handleChange} 
        value={job.title || ''} 
        placeholder='Job Name' 
        autoFocus
        required
        />
        <textarea className='w-full border-none resize-none p-1 outline-none text-lg font-serif flow-root' 
        id='details'
        name='details' 
        onChange={handleChange} 
        value={job.details || ''} 
        placeholder='Add job details' 
        rows = '4' 
        required/>
        <button onClick={submitJob}
        className='relative float-right mr-2.5 w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-4'
        >Add</button>
      </form>
    </div>
  )
}
