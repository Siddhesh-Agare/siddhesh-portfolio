import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUserData } from '../redux/slices/userSlice';



const useFetchUserData = () => {
    const serverUrl = import.meta.env.VITE_SERVER_URL
    const token = localStorage.getItem("token");
    const loading = useSelector((state)=> state.user.loading);
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchUserData = async()=>{
        if(loading) return; 
        dispatch(setLoading(true));
        try {
            const response = await axios.get(`${serverUrl}/api/user/current-user`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response?.data?.success){
                console.log(response?.data?.user);
                dispatch(setUserData(response?.data?.user))
                dispatch(setLoading(false));
            }
        } catch (error) {
            console.log(error)
            dispatch(setLoading(false));
        }
    }
    fetchUserData();
  },[serverUrl,token])
}

export default useFetchUserData
