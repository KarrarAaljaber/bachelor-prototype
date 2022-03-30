

import React from 'react';
import Home from '../components/Home';
import {useState, useEffect} from 'react'
import LoadingScreen from '../components/LoadingScreen';
import { ContextProvider } from '../utils/SocketContext';

export default function HomePage() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoading(false), 2000)
    }, [])
  

  return (
    <>
         {loading === false ? (
        <ContextProvider>
        <Home />
        </ContextProvider>
         ) : (
             <LoadingScreen />
         )}
    
    </>
  );
}
