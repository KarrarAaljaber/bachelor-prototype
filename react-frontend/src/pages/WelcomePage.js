

import EnterName from '../components/Login';
import { useState,useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Login from '../components/Login';

export default function WelcomePage() {

    let history = useNavigate();

    const[loggedOn, setLoggedOn] = useState(false);
    const[username, setUsername] = useState('');

    useEffect(() =>{

        console.log(loggedOn);
        if(loggedOn){
            history('/home', {state: username });

        }
    }, [loggedOn])

    return (
      
    <>
        <Login setLoggedOn={setLoggedOn} setUsername={setUsername} />
    
    </>
  );
}
