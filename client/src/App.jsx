import {useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditJob from './pages/EditJob';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import JobCards from './pages/JobCards';
import CreateJobCardArea from './components/CreateJobCardArea';
import { useSelector } from 'react-redux';

export default function App() {
  //state to store the jobs from the server
  const [jobs, setJobs] = useState([]);
  const {currentUser} = useSelector(state => state.user);

  const getJobs = async () => {
    //fetch the jobs from the server and store them in the state
    try {
      const response = await fetch(`/backend/job/getjobs/${currentUser.username}`);
      const data = await response.json();
      setJobs(data);
      //getJobs();
    } catch (error) {
      console.log(error);
    }
  }
  getJobs();


  useEffect(() => {
    getJobs();
  }, []);

  return <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path='/editjob' element={<EditJob/>}/>
      <Route path='/jobcards' element={
        <>
        <CreateJobCardArea/>
        {
          jobs.map((job, index) => {
            return <JobCards 
              key={index} 
              id={job.id} 
              title={job.title} 
              details={job.details} 
              date={job.date}
              completed={job.completed}
              />
          })
        }
        </>
      }/>
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route> 
    </Routes> 
    <Footer />
  </BrowserRouter>    
}