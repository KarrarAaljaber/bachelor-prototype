import { Button, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import { getPatientsToLogoped } from "../../utils/FirebaseFunctions"


export default function ConnectPatientWithLogo({logopedies}){

    const[selectedLogo, setSelectedLogo] = useState('')
    const[patients, setPatients] = useState([])


    useEffect(async() =>{
        if(selectedLogo !== ''){
            console.log(selectedLogo)
            setPatients(await getPatientsToLogoped(selectedLogo));
        }
      
    }, [selectedLogo])

    function handleSubmit(e){
        setSelectedLogo(e.target.value)
    }
    const optionLogo = logopedies?.map((logo) => {
        return(<option key={logo?.phonenumber} value={logo.phonenumber}> {logo?.fullname}</option>)
    })

  

    return(
        <div>
            <select onChange={(e) =>{handleSubmit(e)}}>
                {optionLogo}
            </select>
            <div>
            <div className="pasCon">
            <h3>pasienter </h3>

            <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                {patients?.map((patient,index) => 
                    <div key={index} className="pasCon"> 
                        <h5>{patient?.fullname}</h5> 
                        <p> personnummer: {patient?.personnumber}</p>
                        <p> mobilnummer: {patient?.phonenumber} </p>
                        <Button variant="contained"  size="small" style={{backgroundColor: 'red'}}onClick={async() =>{
                          //  await removePatient(patient?.phonenumber);
                        }}> Fjern pasient</Button>
                    </div>)}
            </Paper>

            
          
            
        </div>
            </div>
        </div>
    )
}