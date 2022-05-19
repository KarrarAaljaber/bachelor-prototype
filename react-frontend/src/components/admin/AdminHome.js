

import React, { useEffect, useState} from 'react';

import { patientContverter } from '../../utils/firebaseClasses/Patient';
import { Button, Paper, TextField } from '@material-ui/core';
import { getAllPatients,getAllLogopeds, addLogoped,addPatient,removePatient, removeLogoped } from '../../utils/FirebaseFunctions';
import AddNewUser from './AddNewUser';
import ConnectPatientWithLogo from './ConnectPatientWithLogo';
import {useNavigate} from 'react-router-dom'
export default function AdminHome() {

    const[patients,setPatients] = useState([]);
    const[logopedies,setLogopedies] = useState([]);

    const navigate = useNavigate()


    const[wantToAdd, setWantToAdd] = useState({add: false, logoped:false, patient: false});
    const[wantsToConnect, setWantsToConnect] = useState(false);
    
    useEffect( async() => {
          setPatients(await getAllPatients());
          setLogopedies(await getAllLogopeds());
        }, [patients,logopedies])

 



  return (
    <>
    <div className="Admin" >
      <div className="Top">
        <div className="patients">
            <h3>pasienter </h3>

            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                {patients?.map((patient,index) => 
                    <div key={index} className="card"> 
                        <h5>{patient?.fullname}</h5> 
                        <p> personnummer: {patient?.personnumber}</p>
                        <p> mobilnummer: {patient?.phonenumber} </p>
                        <Button variant="contained"  size="small" style={{backgroundColor: 'red'}}onClick={async() =>{
                            await removePatient(patient?.phonenumber.toString());
                        }}> Fjern pasient</Button>
                    </div>)}
            </Paper>

            
            <Button variant="contained"    size="large" color="primary" onClick={(e)  => { setWantsToConnect(false); setWantToAdd({add: true, logoped:false, patient:true})}}> Legg til pasient</Button>
          
            
        </div>
        <div className="logopedies">
            <h3>logopeder </h3>
            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

            {logopedies?.map((logoped) => 
                    <div key={logoped?.phonenumber} className="card"> 
                        <h5>{logoped?.fullname}</h5> 
                        <p> personnummer: {logoped?.personnumber}</p>
                        <p> mobilnummer: {logoped?.phonenumber} </p>
                        <Button variant="contained"  size="small" style={{backgroundColor: 'red'}}onClick={async() =>{
                            await removeLogoped(logoped.phonenumber.toString());
                        }}> Fjern logoped</Button>
                    </div>)}
            </Paper>

            <Button variant="contained"    size="large" color="primary" onClick={(e)  =>{ setWantsToConnect(false); setWantToAdd({add: true, logoped:true, patient:false})}}> Legg til logoped</Button>
            <Button variant="contained"    size="large" color="primary" onClick={(e)  => {            navigate('/Admin/Connect', { state:{ logopedies}});
                                                                                                      setWantToAdd({add: false, logoped:false, patient:false});}}> Tilknytte pasient med logoped </Button>

        </div>

        </div>
    
        {wantToAdd.add && 
            <AddNewUser wantToAdd={wantToAdd}  setWantToAdd={setWantToAdd} />
        }

        {wantsToConnect && 
            <ConnectPatientWithLogo logopedies ={logopedies} />}

    </div>
    </>
  );
}
