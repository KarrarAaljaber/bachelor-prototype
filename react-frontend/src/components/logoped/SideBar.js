

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
export default function SideBar() {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, connectedUsers  } = useContext(SocketContext);
    const [idToCall, setidToCall] = useState('')

    const[patients,setPatients] = useState([])
    const[onlinePatients, setOnlinePatients] = useState([]);
    let patientsArr = [];
    let onlinePatientsArr = [];
    const[currentLogo, setCurrentLogo] = useState([])

    useEffect(async() =>{

        const ref = doc(db, "logopeds", "90212383").withConverter(logopedContverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const logoped = docSnap.data();
            setCurrentLogo(logoped);
            console.log(logoped.toString());
            
            for(let i=0; i< logoped?.patients?.length; i++) {
              const ref = doc(db, "patients", logoped.patients[i].id).withConverter(patientContverter);
              const docSnap = await getDoc(ref);
              const patient = docSnap.data();
              patientsArr.push(patient);
    
            }
            
            
        }
        for(let i=0; i < patientsArr.length; i++) {
            for(let j=0; j < connectedUsers.length; j++){
                if(connectedUsers[j].name == patientsArr[i].fullname){
                    onlinePatientsArr.push(patientsArr[i]);
                }
            }
        }
        setPatients(patientsArr);
        setOnlinePatients(onlinePatientsArr);
        console.log(patients);
      },[])


      const listOnlinePatients =   onlinePatients.map((patient) => {
        return(
            <ListItem className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary={patient.fullname} />
            <ListItemText primary={patient.phonenumber} />
            <Button onClick={()=>{
                const userToCall = connectedUsers.find( u => u.name === patient.fullname)
                console.log(userToCall)

                callUser(userToCall.id)

            }} variant="contained" size="large"  style={{
                    borderRadius: 10,
                    backgroundColor: "#90ee90",
                    fontSize: "18px"
             }} startIcon={<Call fontSize="large" />  }   >  </Button>



       </ListItem>
        )
  

    });

    const listAllPatients = patients.map((patient) =>{
        return(
            <ListItem className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon>
                <Person />
            </ListItemIcon>
            <ListItemText primary={patient.fullname} />
            <ListItemText primary={patient.phonenumber} />
            <Button disabled variant="contained" size="large"  style={{
                    borderRadius: 10,
                    margin: 10,
                    backgroundColor: "gray",
                    fontSize: "18px"
             }} startIcon={<Call fontSize="large" />  }   >  </Button>



       </ListItem>
        )
    })


  return (
    <>
            <div className="sidebar">
                {callAccepted && !callEnded  ?(      
                        <Button variant="contained" size="large" color="primary"  onClick={() => {
                            leaveCall()
                         } }> Avslutt samtalen </Button>
                    )
                    :
                    (
                        <div> 
                            <Typography variant="h6" align="center"  > Dine pasienter(pålogget) </Typography>

                                <List  className="pasientList">
                                    {listOnlinePatients}

                                    </List>
                                    <Typography variant="h6" align="center"  > Dine pasienter(Alle) </Typography>

                                    <List  className="pasientList">
                                        {listAllPatients}

                                    </List>
                        </div>
              
                        /*
                        <div>
                            <TextField id="standard-basic"  value={idToCall} label="kode" helperText="Skriv inn koden til personen du vil ringe"   focused onChange={(event)=>{
                                setidToCall(event.target.value)
                            }} />
                                <Button variant="contained" size="large" color="primary"  onClick={() => {
                                callUser(idToCall)
                                console.log(idToCall)
                                    
                                } } startIcon={<Call fontSize="large" /> }>  </Button>
                            </div>
                            */

                    )
                    }
                       
            
                        <CopyToClipboard text={me} >
                            <Button variant="contained"  size="large" color="secondary" onClick={ () => {console.log(me)}} startIcon={<FileCopy fontSize="large" /> } > Kopier din kode</Button>

                        </CopyToClipboard>
                </div>

    
    </>
  );
}
