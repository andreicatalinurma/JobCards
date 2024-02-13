import React, { useState } from 'react';


export default function CreateJobCardArea() {
    const [job, setJob] = useState({
        title: '',
        details: '',
        completed: false
    });

    function handleChange(e) {
       
    }
    
    async function  submitJob(e)  {
        
    }
    

  return (
    <div>
      <form className='relative bg-white max-w-lg p-4 mx-auto my-8 rounded-lg shadow-lg'>
        <input className='w-full border-none resize-none p-1 outline-none text-3xl font-serif' 
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
