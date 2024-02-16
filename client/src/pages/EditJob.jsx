import React, { useState, useEffect} from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL, getStorage, deleteObject, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';


export default function EditJob() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [ imagePercent, setImagePercent ] = useState(0);
    const [ imageError, setImageError ] = useState(false);
    const [titleUpdate, setTitleUpdate] = useState('');
    const [detailsUpdate, setDetailsUpdate] = useState('');
      //selecting the current user from the redux store
    const {currentUser} = useSelector(state => state.user);

    let id = sessionStorage.getItem('id');
    let title = sessionStorage.getItem('title');
    let details = sessionStorage.getItem('details');

    //let currentUser = sessionStorage.getItem('currentUser');
    // Create a reference for all images stored in the storage
    const imageListRef = ref(storage, `jobs/${currentUser.username}/${id}`);

    // Function to upload image to the storage
    const uploadImage = (e) => {
        e.preventDefault();
        if(titleUpdate !== '' || detailsUpdate !== '' || title !== '' || details !== '') {
            if(imageUpload === null || id === undefined) return;
        // Create a reference to the image in the storage
        const imageRef = ref(storage, `jobs/${currentUser.username}/${id}/${imageUpload.name + v4()}`);
        // Upload the image to the storage and update the imageList state array to display the uploaded image in the UI
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);
        uploadTask.on('state_changed', (snapshot) => {
            // Get the percentage of the image upload progress and update the imagePercent state
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImagePercent(Math.round(progress));
        },
        (error) => {
            setImageError(error);
        },
        () => {
            // Get the download URL of the uploaded image and update the imageList state array
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageList(prevArray => [...prevArray, downloadURL]);
            });
        })
        }
    };
    
    // Function to update the job details in the database
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // Send a post request to the server to update the job title and details in the database
            const response = await fetch(`/backend/job/updatejob/${currentUser.username}/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        title: titleUpdate || title, 
                        details: detailsUpdate || details,
                    })
            });
            const data = await response.json();
            if(data === 'Job has been updated') {
                alert('Job has been updated');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Function to delete an image from the storage
    const handleDelete = (url) => {
        // Create a reference to the image in the storage
        const storage = getStorage();
        const imageRef = ref(storage, url);

        // Delete the image from the storage and update the imageList state array to remove the deleted image from the UI        
        deleteObject(imageRef).then(() => {
            setImageList(imageList.filter((image) => image !== url));
        }).catch((error) => {
            console.log(error);
        });
    };

    // Get all images from the storage and store them in the imageList state array 
    useEffect(() => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                    setImageList(prevArray => [...prevArray, url]);
                });
            });
        });
    }, []);


    return (
        <div className='mb-14'>
          <form onSubmit={(e) => e.preventDefault()}
          className='relative bg-white max-w-lg p-4 mx-auto my-8 rounded-lg shadow-lg'>
            <input className='w-full border-none resize-none p-1 outline-none text-3xl font-serif' 
            name='title' 
            onChange={(e) => setTitleUpdate(e.target.value)}
            value={ titleUpdate || title}
            placeholder='Job Name' 
            autoFocus
            required
            />
            <textarea className='w-full border-none resize-none p-1 outline-none text-lg font-serif flow-root' 
            name='details' 
            onChange={(e) => setDetailsUpdate(e.target.value)}
            value={detailsUpdate || details}
            placeholder='Add job details' 
            rows = '4' 
            required/>
            <button 
            onClick={handleUpdate}
            className='relative float-right mr-2.5 w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-4'
            >Update</button>
            <button onClick={uploadImage}
            className='relative float-right mr-2.5 w-20 px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green sm:text-sm sm:leading-4'
            >Upload</button>
            <input 
            onChange={(e) => setImageUpload(e.target.files[0])}
            type='file' 
            className='relative float-left m-0 w-48 px-1 py-1 text-gray-700 font-medium leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-4'/>
            
          </form>
          <p className='flex justify-center text-lg self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : ('')}
          </p>
          <form onSubmit={(e) => e.preventDefault()} 
          className='flex-wrap max-w-screen-xl mx-auto rounded-lg '>
            <div className='flex flex-wrap justify-around  rounded-lg  p-1 gap-1'>
                   {imageList.map((url, index) => {
                    return <div className='relative'>
                        <img key={index}
                        onClick={
                            (e) => {
                                e.preventDefault();
                                window.open(url, '_blank');
                            }
                        }
                        className='relative flex-left w-full h-72 object-cover  rounded-lg cursor-pointer'
                        src={url} />
                        <button 
                        onClick={() => handleDelete(url)}
                        className='absolute  top-0 right-0 bg-blue-500 text-white p-0 h-6 w-6  m-0.5 rounded hover:bg-blue-800'>x</button>
                    </div>
                })}
            </div>
          </form>
        </div>
      )
}