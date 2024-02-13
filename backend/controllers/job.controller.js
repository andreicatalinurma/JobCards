import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { txtDB } from '../firebase.js';
import { getStorage, ref, deleteObject, listAll } from 'firebase/storage';




export const getjobs = async (req, res) => {
    try {
        const getJobs = [];
        const valRef = collection(txtDB, 'jobs');
        const dataDb = await getDocs(valRef);


        dataDb.forEach(doc => {
            getJobs.push({...doc.data(), id: doc.id});
          });
        res.status(200).json(getJobs);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const strikejob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const strike = req.body.completed;

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

export const deletejob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const storage = getStorage();
        const folderRef = ref(storage, `jobs/${jobId}`);

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
          deleteDoc(doc(txtDB, 'jobs', jobId));
        res.status(200).json('Job has been deleted');
    } catch (error) {
        res.status(500).json(error);
    }
}