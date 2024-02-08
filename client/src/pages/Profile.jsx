import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from "react-redux";
import { 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure, 
} from "../redux/user/userSlice";  // Path: client/src/pages/Profile.jsx

export default function Profile() {
  const dispatch = useDispatch();
  //selecting the current user from the redux store
  const {currentUser, loading, error} = useSelector(state => state.user);
  //reference to the file input
  const fileRef = useRef(null);
  const [ image, setImage ] = useState(undefined);
  const [ imagePercent, setImagePercent ] = useState(0);
  const [ imageError, setImageError ] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);


  //when the image changes, call the handleFileUpload function
  useEffect(() => {
    if(image) {
      handleFileUpload(image);
    }
  }, [image]);
  //function to handle the file upload
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    //create a reference to the file in the storage
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    }
    , (error) => {
      setImageError(error);
    }
    , () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, profilePicture: downloadURL});
      });
    });
  };

  //function to handle the form data 
  const handleChange = (e) => {
    //set the form data to the current state and update the value of the input that changed
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  //function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      dispatch(updateUserStart());
      //make a request to the backend to update the user
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }); 
      const data = await res.json();

      //if the request was not successful, dispatch the failure action
      if(data.success === false) {
        dispatch(updateUserFailure(data));
        return
      }
      //if the request was successful, dispatch the success action
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

    //function to handle the delete account
    const handleDeleteAccount = async () => {
      try {
        dispatch(deleteUserStart());
        //make a request to the backend to delete the user
        const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        //if the request was not successful, dispatch the failure action
        if(data.success === false) {
          dispatch(deleteUserFailure(data));
          return;
        }
        //if the request was successful, dispatch the success action
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error));
      }
    }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=> setImage(e.target.files[0])}/>
        <img 
          src={formData.profilePicture ? formData.profilePicture : currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' onClick={() => fileRef.current.click()}
          />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : ('')}
          </p>
        <input defaultValue={currentUser.username} 
        type='text' 
        placeholder='Username' 
        id='username' 
        className='bg-slate-100 p-3 rounded-lg' 
        onChange={handleChange}
        />

        <input defaultValue={currentUser.email} 
        type='email' 
        placeholder='Email' 
        id='email' 
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
        />

        <input type='password' 
        placeholder='Password' 
        id='password' 
        className='bg-slate-100 p-3 rounded-lg'
        onChange={handleChange}
        />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity80'>{loading ? 'Loading...' : 'Update'}</button>
      </form>
      <div className="flex justify-between mt-5 ">
          <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p className="text-green-700 mt-5">{updateSuccess && "User is updated successfully!"}</p>
    </div>
  )
}