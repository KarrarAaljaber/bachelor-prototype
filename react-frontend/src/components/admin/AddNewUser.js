import { Button, TextField } from "@material-ui/core"
import { useState } from "react";
import { addLogoped, addPatient } from "../../utils/FirebaseFunctions"


export default function AddNewUser({ setWantToAdd, wantToAdd}){

    const[newName, setNewName] = useState('');
    const[newPhone,setNewPhone] = useState('');
    const[newPr, setNewPr] = useState('');

    return(
  <div className="Data">
    {wantToAdd.logoped && <h1>Legg til logoped</h1>}
    {wantToAdd.patient && <h1>Legg til en pasient</h1>}

    <TextField id="mobil" style={{width:300}} label="mobilnummer" type="number" helperText="(+47)"    focused onChange={(event)=>{
        setNewPhone(event.target.value)
    }}/>
    <TextField id="fullname"  style={{width:300}}   label="fullnavn" type="text" helperText="(navn)"    focused onChange={(event)=>{
        setNewName(event.target.value)
        }}/>
    <TextField id="personnummer"  style={{width:300}}   label="personnummer" type="number" helperText="pr"    focused onChange={(event)=>{
        setNewPr(event.target.value)
        }}/>
    <Button variant="contained"  size="large" color="primary" onClick={async() =>{
        

        if(!(newName.length === 0 || newPhone.length === 0  || newPr.length === 0 )){
            if(wantToAdd.patient){
                await addPatient(newName.toString(), newPr.toString(), newPhone.toString())
                setWantToAdd({add:false, logoped:false, patient:false})
            


           }else if(wantToAdd.logoped){
            await addLogoped(newName.toString(), newPr.toString(), newPhone.toString())
            setWantToAdd({add:false, logoped:false, patient:false})

           } 
        }

      
    }}> Legg til </Button>

    

</div>
  );
}