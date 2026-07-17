import React from 'react'
import Navbar from '../../components/adminComponents/Navbar'
import Footer from '../../components/adminComponents/Footer'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useFetchUserData from '../../hooks/useFetchUserData'


const Home = () => {
  useFetchUserData();

  const {userData, loading, token} = useSelector((state)=>state.user);

  if(!token){
    return <Navigate to="/admin/login" />;
  }

  if(loading){
    return<h1>Loading....</h1>;
  }

  if(!userData){
    return null;
  }
  return (
   <>
    <Navbar/>
    <h1>{userData?.name}</h1>
    <Footer/>


   </>
  );
}

export default Home
