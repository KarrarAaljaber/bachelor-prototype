import React from 'react';
import Toolbar from './Toolbar';
import Video from '../Video';

import {useState, useEffect} from 'react'
import SideBarCall from './SideBarCall';
import {useLocation} from 'react-router-dom'
import SideBarControl from '../SideBarControl';


export default function HomeLogoped() {


  const [onSideBarCall, setonSideBarCall] = useState(false)
  const[onSideBarControl, setOnSideBarControl] = useState(false)
  const [currentStyle, setCurrentStyle] = useState('container')
  
  const {state} = useLocation();


  useEffect(() => {

    if(!onSideBarControl && !onSideBarCall){
      setCurrentStyle("container")

    }else if(onSideBarControl && !onSideBarCall){
      setCurrentStyle("container-sidebarLeft")

    }else if(!onSideBarControl && onSideBarCall){
        setCurrentStyle("container-sidebarRight")

    }else{
      setCurrentStyle("container-sidebarBoth")
    }

  }, [onSideBarControl, onSideBarCall])

  return (
    <>
        
        <div className={currentStyle}>
            {onSideBarCall && (<SideBarCall logopedPN={state?.phoneNumber} />)}
            {onSideBarControl && (<SideBarControl />)}

            <Video></Video>
            <Toolbar setOnSideBarControl={setOnSideBarControl} setonSideBar={setonSideBarCall}>
            </Toolbar>
        </div>
    </>
  );
}
