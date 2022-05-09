import React from 'react';
import Toolbar from './Toolbar';
import Video from '../Video';

import {useState, useEffect} from 'react'
import SideBar from './SideBar';
import Notifications from './Notifications';
import {useLocation} from 'react-router-dom'


export default function HomePatient() {


  const [onSideBar, setonSideBar] = useState(false)
  const [currentStyle, setCurrentStyle] = useState('container')
  


  useEffect(() => {
    if(!onSideBar){
      setCurrentStyle("container")
    }else{
      setCurrentStyle("container-sidebar")
    }
  }, [onSideBar])

  return (
    <>
        
        <div className={currentStyle}>
            {onSideBar && (<SideBar />)}
            <Video></Video>
            <Toolbar setonSideBar={setonSideBar}>
            </Toolbar>
            <Notifications />

        </div>
    </>
  );
}