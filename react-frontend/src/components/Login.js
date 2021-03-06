import { Button, TextField, Typography, Checkbox,FormControlLabel } from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import { signInWithPhoneNumber,RecaptchaVerifier  } from "firebase/auth";

import {authorize,db} from "../utils/firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { patientContverter } from '../utils/firebaseClasses/Patient';
import { NavLink } from 'react-router-dom';
import { logopedContverter } from '../utils/firebaseClasses/Logoped';
import { LoginAsLogoped, LoginAsPatient } from '../utils/FirebaseLogins';

const Login = ({setLoggedOn, setUsername, setIsLogoped,isLogoped,setPN}) =>{

    const[phoneNumber, setPhoneNumber] =useState('');
    const[gotCode, setGotCode] =useState(false)
    const[code, setCode] =useState(0)

    

  
    const captcha =() =>{
        window.recaptchaVerifier = new RecaptchaVerifier('captchatest', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
          }, authorize);

    }
    const handleSubmit =  async (event) =>{
        event.preventDefault();
        if(phoneNumber.length >=8){
            if(!isLogoped){
              await LoginAsPatient(phoneNumber, setUsername,setGotCode)
            }else{
              await LoginAsLogoped(phoneNumber, setUsername, setGotCode);
            }
        }else{
            alert("Et mobilnummer må ha 8 siffer")

        }

    }
    
    const confirmCode = (confirmationResult, code) => {
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            
            console.log(user);
            setLoggedOn(true)
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
    }
   
    return (
        <div >
            <form  onSubmit={handleSubmit} >

             

                    {gotCode ?
                      <div className="Login"> 
                      <Typography variant="h4" align="center" color="secondary"  >
                      Velkommen tilbake,  </Typography>
                      {/* 
                      <TextField id="standard-basic"  label="personnummer"    focused onChange={(event)=>{
                      }} />
                      */}
                    <TextField inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} InputLabelProps={{style: {fontSize: 30, color:'black'}}}  id="standard-basic"  label="Mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
                        setPhoneNumber(event.target.value)



                    }} /> 


                      <TextField id="sms" inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} InputLabelProps={{style: {fontSize: 30, color:'black'}}}   label="engangskoden(sms)" type="number" helperText="(sjekk sms)"    focused onChange={(event)=>{
                      setCode(event.target.value)

                      }} /> 
                      <Button variant="contained" size="large" color="primary"   onClick={() => {
                          //setLoggedOn(true);
                          confirmCode(window.confirmationResult, code);

                      
                      } }> Koble til </Button>
                  </div>
                   
                    :
                    <div className="Login"> 
                    <Typography variant="h4" align="center" color="secondary"  >
                    Velkommen tilbake  </Typography>
                    {/* 
                    <TextField id="standard-basic"  label="personnummer"    focused onChange={(event)=>{
                    }} />
                    */}
                    <TextField inputProps={{style: {fontSize: 20, marginTop: 20, color: 'black'}}} InputLabelProps={{style: {fontSize: 30, color:'black'}}}  id="standard-basic"  label="Mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
                        setPhoneNumber(event.target.value)

                        

                    }} />  
               

                     <Button variant="contained" size="large" color="primary" type="submit" className='buttonLogin'> Få engangskode </Button>

                    <div className="adminLogo">
                      <FormControlLabel
                        value="logoped"
                        
                        control={<Checkbox onChange={(event)=>{setIsLogoped(event.target.value)}} />}
                        label="Logg in som logoped"
                        labelPlacement="left"
                      />
                      <NavLink to="/Admin" > Er du admin? Klikk her!</NavLink>

                    </div>
                </div>
                
                }
                  

            </form>

            <div id="captchatest" ></div>
        </div>
    );
        
    
}
 
export default Login ;