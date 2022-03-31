

import React, { useEffect, useState} from 'react';

import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../../utils/firebaseClient';
import { patientContverter } from '../../utils/firebaseClasses/Patient';
import { Button, Paper } from '@material-ui/core';

export default function AdminHome() {

    const[patients,setPatients] = useState([]);
    const[logopedies,setLogopedies] = useState([]);
    
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



        }, [])



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
                        <Button variant="contained"  size="small" color="secondary"> slett pasient</Button>
                    </div>)}
            </Paper>
            <Button variant="contained"    size="large" color="primary"> Legg til pasient</Button>     
        </div>
        <div className="logopedies">
            <h3>logopeder </h3>
            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                {logopedies?.map((logo) => <div className="card"> 
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
