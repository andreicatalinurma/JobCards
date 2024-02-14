import { collection, doc, getDocs, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { txtDB } from '../firebase.js';
import { ref, listAll, getStorage, deleteObject } from 'firebase/storage';



//create function to get all jobs from database
export const getjobs = async (req, res) => {
    try {
      //create empty array to store jobs from database
        const getJobs = [];
        const valRef = collection(txtDB, 'jobs');
        const dataDb = await getDocs(valRef);

        //loop through the jobs from database and push them to the empty array
        dataDb.forEach(doc => {
            getJobs.push({...doc.data(), id: doc.id});
          });
        res.status(200).json(getJobs);
    } catch (error) {
        res.status(500).json(error);
    }
}

//create function to update job status in database
export const strikejob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const strike = req.body.completed;

        //send a put request to the server to update the job as completed or not
        const jobRef = doc(txtDB, 'jobs', jobId);
            if(strike === true){
              await updateDoc(jobRef, {completed: false})
            } else {
              await updateDoc(jobRef, {completed: true})
            }
        res.status(200).json('Job has been updated');
    } catch (error) {
        res.status(500).json(error);
    }
}

//create function to update the job in the database
export const updatejob = async (req, res) => {
  try {
      const id = req.params.id;
      const title = req.body.title;
      const details = req.body.details;

      //send a put request to the server to update the job title and details
      const jobRef = doc(txtDB, 'jobs', id);
      await updateDoc(jobRef, {
          title: title,
          details: details,
      });

      res.status(200).json('Job has been updated');
  } catch (error) {
      res.status(500).json(error);
  }
};

//create function to delete job from database 
export const deletejob = async (req, res) => {
    try {
      //get the job id from the request
        const jobId = req.params.id;
        const storage = getStorage();
        const folderRef = ref(storage, `jobs/${jobId}`);

        //send a delete request to the server to delete the pics from the database
        listAll(folderRef).then((listResults) => {
            listResults.items.forEach((itemRef) => {
              deleteObject(itemRef).then(() => {
              }).catch((error) => {
                console.log(error);
              });
            });
          }).catch((error) => { 
            console.log(error);
          });
          //send a delete request to the server to delete the job from the database
          deleteDoc(doc(txtDB, 'jobs', jobId));
        res.status(200).json('Job has been deleted');
    } catch (error) {
        res.status(500).json(error);
    }
}

//create function to submit job to database
export const submitjob = async (req, res) => {
    try {
      //get the job details from the request
        const newJob = req.body;
        const newJobRef = await collection(txtDB, 'jobs');
        //send a post request to the server to add the job to the database
        await addDoc(newJobRef,
          {
            title: newJob.title,
            details: newJob.details,
            date: new Date().toDateString(),
            completed: false
          })
        res.status(201).json('Job has been added');
    } catch (error) {
        res.status(500).json(error);
    }
}





