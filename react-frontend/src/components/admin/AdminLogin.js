

import { Button, TextField, Typography } from '@material-ui/core';
import { getDoc,doc } from 'firebase/firestore';
import React, { useState } from 'react';
import {authorize,db} from "../../utils/firebaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  let navigate = useNavigate();

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");  

  const handleSubmit = async() => {
    const ref = doc(db, "admin", "admin");
    const docSnap = await getDoc(ref);
    //console.log("Document data:", docSnap.data());
    if(username == docSnap.data().username && password == docSnap.data().password){
      navigate('/Admin/Home')
    }else{
        alert("Wrong login!!!!")
    }
  }
  return (
    <>
        <div className="Login"> 
            <Typography variant="h4" align="center"  >Velkommen admin  </Typography>
            <TextField inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} InputLabelProps={{style: {fontSize: 30, color:'black'}}} id="username" style={{fontSize: 20}} label="Brukernavn"   focused onChange={(event)=>{
                        setUsername(event.target.value)
                    }} /> 
            <TextField inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} InputLabelProps={{style: {fontSize: 30, color:'black'}}} id="password" inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} label="Passord" type="password"   focused onChange={(event)=>{
                setPassword(event.target.value)
            }} /> 

            <Button variant="contained" size="large" color="primary" type="submit"  onClick={handleSubmit}>Koble til </Button>
            
        </div>

    </>
  );
}
