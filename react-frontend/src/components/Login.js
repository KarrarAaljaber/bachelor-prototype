import { Button, TextField, Typography, Checkbox,FormControlLabel } from '@material-ui/core';
import React, {useEffect, useState} from 'react';

import { signInWithPhoneNumber,RecaptchaVerifier  } from "firebase/auth";

import {authorize,db} from "../utils/firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { patientContverter } from '../utils/firebaseClasses/Patient';
import { NavLink } from 'react-router-dom';
import { logopedContverter } from '../utils/firebaseClasses/Logoped';

const Login = ({setLoggedOn, setUsername, setIsLogoped,isLogoped}) =>{

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
              const ref = doc(db, "patients", phoneNumber).withConverter(patientContverter);
              const docSnap = await getDoc(ref);
              if (docSnap.exists()) {
                  const patient = docSnap.data();
                  console.log(patient.toString());
                  captcha()
                  const captchaVer = window.recaptchaVerifier;
  
                  
                  signInWithPhoneNumber(authorize, "+47" +phoneNumber, captchaVer)
                  .then((confirmationResult) => {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).
                      setUsername(patient.fullname)
  
                      window.confirmationResult = confirmationResult;
                      setGotCode(true)
  
                  }).catch((error) => {
                  // Error; SMS not sent
                  // ...
                  console.log(error)
                  });
                  

              
  
  
                } else {
                  alert("Det finnes ikke en pasient med dette nummert!")
                }
            }else{
              const ref = doc(db, "logopeds", phoneNumber).withConverter(logopedContverter);
              const docSnap = await getDoc(ref);
              if (docSnap.exists()) {
                  const logoped = docSnap.data();
                  console.log(logoped.toString());
                  captcha()
                  const captchaVer = window.recaptchaVerifier;
  
                  
                  signInWithPhoneNumber(authorize, "+47" +phoneNumber, captchaVer)
                  .then((confirmationResult) => {
                  // SMS sent. Prompt user to type the code from the message, then sign the
                  // user in with confirmationResult.confirm(code).
                      setUsername(logoped.fullname)
                      
                      window.confirmationResult = confirmationResult;
                      setGotCode(true)
  
                  }).catch((error) => {
                  // Error; SMS not sent
                  // ...
                  console.log(error)
                  });
                  
         
  
  
                } else {
                  alert("Det finnes ikke en logoped med dette nummert!")
                }

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
                      <Typography variant="h4" align="center"  >
                      Velkommen tilbake  </Typography>
                      {/* 
                      <TextField id="standard-basic"  label="personnummer"    focused onChange={(event)=>{
                      }} />
                      */}
                        <TextField id="mobil"  label="mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
                        setPhoneNumber(event.target.value)



                    }} /> 


                      <TextField id="sms"  label="engangskoden(sms)" type="number" helperText="(sjekk sms)"    focused onChange={(event)=>{
                      setCode(event.target.value)

                      }} /> 
                      <Button variant="contained" size="large" color="primary"   onClick={() => {
                          //setLoggedOn(true);
                          confirmCode(window.confirmationResult, code);

                      
                      } }> Koble til </Button>
                  </div>
                   
                    :
                    <div className="Login"> 
                    <Typography variant="h4" align="center"  >
                    Velkommen tilbake  </Typography>
                    {/* 
                    <TextField id="standard-basic"  label="personnummer"    focused onChange={(event)=>{
                    }} />
                    */}
                    <TextField id="standard-basic"  label="mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
                        setPhoneNumber(event.target.value)

                        

                    }} />  
                    <FormControlLabel
                      value="logoped"
                      control={<Checkbox onChange={(event)=>{setIsLogoped(event.target.value)}} />}
                      label="Logoped?"
                      labelPlacement="bottom"
                    />

                     <Button variant="contained" size="large" color="primary" type="submit"> Få en gangs kode </Button>
                     <NavLink to="/Admin" > Er du admin? Klikk her!</NavLink>

                </div>
                
                }
                  

            </form>

            <div id="captchatest" ></div>
        </div>
    );
        
    
}
 
export default Login ;