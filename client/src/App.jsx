import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/adminPages/Login';
import Register from './pages/adminPages/Register';
import Home from './pages/adminPages/Home';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/adminPages/Dashboard';
import Profile from './pages/adminPages/Profile';
import Experience from './pages/adminPages/Experience';
import Projects from './pages/adminPages/Projects';
import Skills from './pages/adminPages/Skills';
import Education from './pages/adminPages/Education';

const App = () => {
  
   
  return( 
  <>
  <Toaster/>
  <Routes>
    <Route path='/admin' element={<Home/>}>
    <Route index element={<Dashboard/>}/>
    <Route path='profile' element={<Profile/>}/>
    <Route path='experience' element={<Experience/>}/>
    <Route path='projects' element={<Projects/>}/>
    <Route path='skills' element={<Skills/>}/>
    <Route path='education' element={<Education/>}/>
    </Route>
    <Route path='admin/login' element={ <Login/>}/>
    <Route path='admin/register' element={<Register/>}/>
  </Routes>


  </>)
};


export default App
