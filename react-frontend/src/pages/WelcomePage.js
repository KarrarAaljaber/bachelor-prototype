

import EnterName from '../components/Login';
import { useState,useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import Login from '../components/Login';

export default function WelcomePage() {

    let history = useNavigate();

    const[loggedOn, setLoggedOn] = useState(false);
    const [isLogoped, setIsLogoped] = useState(false)

    const[username, setUsername] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');

    useEffect(() =>{

        console.log(loggedOn);
        if(loggedOn){
            history('/home', { state:{ username, isLogoped, phoneNumber}});

        }
    }, [loggedOn])

    return (
      
    <>
        <Login setIsLogoped={setIsLogoped} setPN={setPhoneNumber} isLogoped={isLogoped} setLoggedOn={setLoggedOn} setUsername={setUsername} />
    
    </>
  );
}
