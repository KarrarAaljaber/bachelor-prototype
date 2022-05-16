

import React, { useContext } from 'react';
import {useState, useEffect} from 'react'
import LoadingScreen from '../components/LoadingScreen';
import { ContextProvider, SocketContext } from '../utils/SocketContext';
import {useLocation} from 'react-router-dom'
import HomeLogoped from '../components/logoped/HomeLogoped';
import HomePatient from '../components/patient/HomePatient';

export default function HomePage() {

  const {state} = useLocation();



  
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      console.log(state.isLogoped)
      console.log(state)
     
      setTimeout(() => setLoading(false), 2000)
    }, [])
  

  return (
    <>
      <ContextProvider>

         {loading  && <LoadingScreen />}
         {loading === false && ( state.isLogoped ? (<HomeLogoped/>) : (<HomePatient/>) )}
         </ContextProvider>
    
    </>
  );
}
