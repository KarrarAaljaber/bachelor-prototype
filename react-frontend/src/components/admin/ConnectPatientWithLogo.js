import { Button, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import { connectPWithL, disconnectPWithL, getAllPatients, getLogoped,getPatient, getPatientsToLogoped } from "../../utils/FirebaseFunctions"


export default function ConnectPatientWithLogo({logopedies}){

    const[selectedLogo, setSelectedLogo] = useState([])
    const[selectedPatient, setSelectedPatient] = useState([])

    const[selectedLogoPN, setSelectedLogoPN] = useState('')
    const[selectedPatientPN, setSelectedPatientPN] = useState('')

    const[logoPatients, setLogoPatients] = useState([])
    const[allPatients, setAllPatients] = useState([])

    const[addPatient, setAddPatient] = useState(false)


    useEffect(async() => {
        setAllPatients(await getAllPatients());
    },[])
    useEffect(async() =>{
        if(selectedLogoPN !== ''){
            setLogoPatients(await getPatientsToLogoped(selectedLogoPN));
        }

        setSelectedPatient(await getPatient(selectedPatientPN))
        setSelectedLogo(await getLogoped(selectedLogoPN));

      
    }, [selectedLogoPN, selectedPatientPN])

    function handleSubmit(e){
        setSelectedLogoPN(e.target.value)
    }
    const optionLogo = logopedies?.map((logo) => {
        return(<option key={logo?.phonenumber} value={logo.phonenumber}> {logo?.fullname}</option>)
    })

    const optionPatient = allPatients.map((patient) => {
       return( 
        <option key={patient?.phonenumber} value={patient.phonenumber}> {patient?.fullname}</option>

        )
    })
  

    return(
        <div className="connect">
            <h3 > Velg en logoped </h3> 
            <select onChange={(e) =>{handleSubmit(e)}}>
                {optionLogo}
            </select>
            <div className="pasCon">
                <h3> Logopedens pasienter </h3>

                <Paper className="paper" style={{maxHeight: '80%', overflow: 'auto'}}>

                    {logoPatients?.map((patient,index) => 
                        <div key={index} className="pasCon"> 
                            <h5>{patient?.fullname}</h5> 
                            <p> personnummer: {patient?.personnumber}</p>
                            <p> mobilnummer: {patient?.phonenumber} </p>
                            <Button variant="contained"  size="small" style={{backgroundColor: 'red'}}onClick={async() =>{
                                await disconnectPWithL(selectedLogoPN, patient.phonenumber.toString());
                                let p = []
                                p = await getPatientsToLogoped(selectedLogoPN)
                                setLogoPatients(p)
                                
                            }}> Fjern pasient</Button>
                        </div>)}
                </Paper>
                <Button variant="contained"  size="small" color="primary" onClick={async() =>{ setAddPatient(true)} } > Legg til pasient</Button>
          
            
        </div>
        
        {addPatient && selectedLogoPN  !== '' &&
            <div className="pasCon"> 
            <h3 > Velg en pasient </h3> 
            <select  onChange={(e) =>{setSelectedPatientPN(e.target.value)}}>
                {optionPatient}

            </select>

            {selectedPatientPN !== ''  &&
            <Button variant="contained"  size="small" color="primary" onClick={async() =>{ 

                await connectPWithL(selectedLogoPN.toString(),selectedPatientPN.toString());
                let p = []
                p = await getPatientsToLogoped(selectedLogoPN)
                setLogoPatients(p)
                setAddPatient(false)
         


            } } > Koble logopeden  { selectedLogo?.fullname } sammen med pasienten {selectedPatient?.fullname}</Button> 

             }
            </div>
         }
        </div>
    )
}