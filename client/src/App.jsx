import {useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import JobCards from './pages/JobCards';
import CreateJobCardArea from './components/CreateJobCardArea';

export default function App() {
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    const response = await fetch('/backend/job/getjobs');
    const data = await response.json();
    setJobs(data);
  }

  useEffect(() => {
    getJobs();
  }, []);

  return <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
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