import React, { useState} from 'react';
import { Link } from 'react-router-dom';


export default function JobCards(props) {
    //set the state for the strike through effect on the job
    const [strikeThrough, setStrikeThrough] = useState(props.completed);


    async function toggleStrikeThrough(id) {
        //toggle the strike through effect
        try {
            //send a post request to the server to update the job as completed or not
            const response = await fetch(`/backend/job/strikejob/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed: strikeThrough})
            });
            const data = await response.json();
            if(data === 'Job has been updated') {
                setStrikeThrough(!strikeThrough);
            }
        } catch (error) {
            console.log(error);
        }   
    }

    function handleDelete(id) {
        //ask user to confirm delete
        let confirmDelete = window.confirm('Are you sure you want to delete this job?');
        try {
            //if user confirms delete, send a delete request to the server
            if(confirmDelete) {
                fetch(`/backend/job/deletejob/${id}`, {  
                    method: 'DELETE',            
                });
            } else {
                alert('Delete cancelled');
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleEdit() {
        //edit the job
        sessionStorage.setItem('id', props.id);
        sessionStorage.setItem('title', props.title);
        sessionStorage.setItem('details', props.details);
    }


    return (
            
        <div className='float-left bg-white w-96 m-4 mb-20 p-3 rounded-lg'>
            <h1 onClick={() => toggleStrikeThrough(props.id)} className={`text-3xl font-bold mb-2 text-slate-700 ${ strikeThrough ? 'line-through' : 'no-underline'}`}>{props.title} </h1>
            <p className='whitespace-pre-wrap break-words text-1xl mb-2'>{props.details}</p>
          <p className='relative float-left text-lg bg-slate-200 p-1 rounded-lg'>{props.date}</p>
          <button onClick={() => handleDelete(props.id)}
          className='relative float-right mr-2.5 w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red sm:text-sm sm:leading-4'
          >Delete</button>
          <Link to='/editjob'>
          <button 
            onClick={() => handleEdit(props.id)}
            className='relative float-right mr-2.5 w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-4'
            >Edit</button>
          </Link>
        </div>
      )
}
