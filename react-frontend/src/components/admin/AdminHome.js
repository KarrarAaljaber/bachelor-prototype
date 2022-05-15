

import React, { useEffect, useState} from 'react';

import { collection, doc,setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../../utils/firebaseClient';
import { patientContverter } from '../../utils/firebaseClasses/Patient';
import { Button, Paper, TextField } from '@material-ui/core';

export default function AdminHome() {

    const[patients,setPatients] = useState([]);
    const[logopedies,setLogopedies] = useState([]);

    const[newName, setNewName] = useState('');
    const[newPhone,setNewPhone] = useState('');
    const[newPr, setNewPr] = useState('');

    
    useEffect( async() => {
        const patients = await getDocs(collection(db, "patients"))
        let p = []
        patients.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            p.push({
               fullname: doc.data().fullname, 
               phonenumber: doc.data().phonenumber,
               personnumber: doc.data().personnumber
           });
          }); 
          setPatients(p);

        const logo = await getDocs(collection(db, "logopeds"))
        let l = []
        logo.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           l.push({
               fullname: doc.data().fullname, 
               phonenumber: doc.data().phonenumber,
               personnumber: doc.data().personnumber
           });
          }); 
          setLogopedies(l);



        }, [patients,logopedies])



  return (
    <>
    <div className="Admin" >
        <div className="patients">
            <h3>pasienter </h3>

            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                {patients?.map((patient) => 
                    <div className="card"> 
                        <h5>{patient?.fullname}</h5> 
                        <p> personnummer: {patient?.personnumber}</p>
                        <p> mobilnummer: {patient?.phonenumber} </p>
                        <Button variant="contained"  size="small" color="secondary" onClick={async() =>{
                            await deleteDoc(doc(db, 'patients', patient?.phonenumber));
                        }}> slett pasient</Button>
                    </div>)}
            </Paper>

            {
                /*<Popup trigger={            <Button variant="contained"    size="large" color="primary"> Legg til pasient</Button>} position="center">
                <div>
                <TextField id="mobil"  label="mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
                    setNewPhone(event.target.value)
                }}/>
                <TextField id="fullname"  label="fullnavn" type="text" helperText="(navn)"    focused onChange={(event)=>{
                    setNewName(event.target.value)
                    }}/>
                <TextField id="personnummer"  label="personnummer" type="number" helperText="pr"    focused onChange={(event)=>{
                    setNewPr(event.target.value)
                    }}/>
                <Button variant="contained"  size="large" color="primary" onClick={async() =>{
                    const data ={
                        fullname: newName,
                        personnumber: newPr,
                        phonenumber: newPhone

                    }
                    console.log(data)
                   await setDoc(doc(db, "patients", newPhone),data )
                }}> Legg til </Button>

                </div>

            
            </Popup> */}
        </div>
        <div className="logopedies">
            <h3>logopeder </h3>
            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                {logopedies?.map((logo) => 
                        <div className="card"> 
                        <h5>{logo?.fullname}</h5> 
                        <p> personnummer: {logo?.personnumber}</p>
                        <p> mobilnummer: {logo?.phonenumber} </p>
                        
                            
                        </div>)}
            </Paper>
        </div>

        
    </div>
    </>
  );
}
