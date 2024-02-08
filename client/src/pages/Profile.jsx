import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  //selecting the current user from the redux store
  const {currentUser} = useSelector(state => state.user);
  //reference to the file input
  const fileRef = useRef(null);

  const [ image, setImage ] = useState(undefined);
  const [ imagePercent, setImagePercent ] = useState(0);
  const [ imageError, setImageError ] = useState(false);
  const [formData, setFormData] = useState({});
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
    //create a reference to the file in the storage using the file name and the storage instance
    const storageRef = ref(storage, fileName);
    //upload the file to the storage using the reference and the file 
    const uploadTask = uploadBytesResumable(storageRef, image);
    //listen to the state change of the upload task 
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress));
    }
    , (error) => {
      setImageError(error);
    }
    , () => {
      //get the download url of the file after the upload is complete 
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData, profilePicture: downloadURL});
      });
    }
    )
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
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
        <input defaultValue={currentUser.username} type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input defaultValue={currentUser.email} type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg'/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity80'>Update</button>
      </form>
      <div className="flex justify-between mt-5 ">
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}