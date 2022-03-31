



import React from 'react';
import {useState, useEffect} from 'react'
import AdminHome from '../../components/admin/AdminHome';
import LoadingScreen from '../../components/LoadingScreen';

export default function HomePageAdmin() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoading(false), 2000)
    }, [])
  

  return (
    <>
         {loading === false ? (
        <AdminHome />
         ) : (
             <LoadingScreen />
         )}
    
    </>
  );
}
