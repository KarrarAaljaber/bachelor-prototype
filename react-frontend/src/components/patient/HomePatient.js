import React from 'react';
import Toolbar from './Toolbar';
import Video from '../Video';

import {useState, useEffect} from 'react'
import Notifications from './Notifications';
import {useLocation} from 'react-router-dom'

import SideBarControl from '../SideBarControl'
import Chat from '../Chat';
export default function HomePatient() {


  const [onSideBarCall, setonSideBarCall] = useState(false)
  const [chatOn, setChatOn] = useState(false)

  const[onSideBarControl, setOnSideBarControl] = useState(false)
  const [currentStyle, setCurrentStyle] = useState('container')
  
  const {state} = useLocation();


  useEffect(() => {

    if(!onSideBarControl && !onSideBarCall && !chatOn){
      setCurrentStyle("container")

    }else if(onSideBarControl && (!onSideBarCall && !chatOn )){
      setCurrentStyle("container-sidebarLeft")

    }else if(!onSideBarControl && (onSideBarCall || chatOn)){
        setCurrentStyle("container-sidebarRight")

    }else{
      setCurrentStyle("container-sidebarBoth")
    }

  }, [onSideBarControl, onSideBarCall, chatOn])


  return (
    <>
        
        <div className={currentStyle}>
            {onSideBarControl && (<SideBarControl />)}
            {chatOn && (<Chat />)}
            <Video setChatOn ={setChatOn}></Video>
            <Toolbar setOnSideBarControl={setOnSideBarControl} setonSideBar={setonSideBarCall} />

            <Notifications />

        </div>
    </>
  );
}
