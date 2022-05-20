

import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useContext, useState} from 'react';
import { SocketContext } from '../../utils/SocketContext'
import {useEffect} from 'react'
import { collection, doc, getDoc,getDocs } from "firebase/firestore";
import {authorize,db} from "../../utils/firebaseClient";
import { logopedContverter } from '../../utils/firebaseClasses/Logoped';
import { patientContverter } from '../../utils/firebaseClasses/Patient';

import { Button, TextField,List,ListItemText, ListItem,ListItemIcon, Typography } from '@material-ui/core';
import {  Call, FileCopy,Inbox } from '@material-ui/icons';
import { Person } from '@material-ui/icons';


import {getLogoped,getPatientsToLogoped} from '../../utils/FirebaseFunctions'
export default function SideBarCall({logopedPN,setonSideBarCall,setWhoICall}) {
    const {sessionStarted,sessionEnded, callPatient, connectedUsers  } = useContext(SocketContext);

    const[patients,setPatients] = useState([])
    const[onlinePatients, setOnlinePatients] = useState([]);
    let onlinePatientsArr = [];
    const[currentLogo, setCurrentLogo] = useState([])

    useEffect(async() =>{

        console.log(logopedPN)
        setCurrentLogo(await getLogoped("90212383"));
        console.log(currentLogo.toString());
        
        setPatients(await getPatientsToLogoped("90212383"));  
            

      },[])
    useEffect(async() =>{
        
        for(let i=0; i < patients?.length; i++) {
            for(let j=0; j < connectedUsers.length; j++){
                if(connectedUsers[j].name == patients[i].fullname){
                    onlinePatientsArr.push(patients[i]);
                }
            }
        }
        setOnlinePatients(onlinePatientsArr);
        console.log(patients);
    },[patients])

      const listOnlinePatients =   onlinePatients.map((patient) => {
        return(
            <ListItem key={patient?.fullname} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary={patient.fullname} />
            <ListItemText primary={patient.phonenumber} />
            <Button onClick={()=>{
                const userToCall = connectedUsers.find( u => u.name === patient.fullname)
                console.log(userToCall)

                callPatient(userToCall.id)
                setWhoICall(userToCall.name)
                setTimeout(() =>                 setonSideBarCall(false), 1000)

            }} variant="contained" size="large"  style={{
                    borderRadius: 10,
                    backgroundColor: "#90ee90",
                    textAlign : 'center',
                    fontSize: "20px"
             }} startIcon={<Call fontSize="large" />}   >  </Button>



       </ListItem>
        )
  

    });

    const listOfflinePatients = patients.filter(function(x,index) { return x !== onlinePatients[index]; })
    .map((patient) =>{
        return(
            <ListItem key={patient.fullname} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary={patient.fullname} style={{maxWidth:'40%'}}  />
            <ListItemText primary={patient.phonenumber} />




       </ListItem>
        )
    })


  return (
    <>
            <div className="sidebar-right">
               
                     {  !sessionStarted && !sessionEnded &&
                        <div> 

                            <List  className="pasientList">
                                <Typography variant="h6" align="center"  style={{fontSize: 25}} >  Dine pasienter </Typography>
                                <Typography variant="h6" align="center"  style={{borderBottom:'2px solid white'}}  >  Pålogget </Typography>

                                {listOnlinePatients}

                                </List>

                                <List  className="pasientList" style={{borderTop:'2px solid white', marginTop: 80}}>
                                    <Typography variant="h6" align="center" style={{borderBottom:'2px solid white'}}   > Avlogget </Typography>

                                    {listOfflinePatients}

                                </List>
                        </div>
              

                     } 
                    

                    
                </div>

    
    </>
  );
}
