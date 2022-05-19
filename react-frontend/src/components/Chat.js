import { VolumeDown, VolumeUp } from "@material-ui/icons";


import { Button, TextField,List,ListItemText, ListItem,ListItemIcon, Typography } from '@material-ui/core';
import {  Call, FileCopy,Inbox, Person,  } from '@material-ui/icons';

export default function Chat (){

    return(
        <div className="sidebar-right" style={{display: 'flex', flexDirection: 'column', gap:30, justifyContent: 'space-between'}}>
            <Typography variant="h6" align="center"  style={{fontSize: 25}} >  Chat </Typography>
            <ListItem style={{backgroundColor: '#8BBD24'}}className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText> Heisånn</ListItemText>
            </ListItem>

            <ListItem style={{backgroundColor: 'white'}} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon align="right"><Person align="right" /></ListItemIcon>
            <ListItemText align="right"> Send meg filen</ListItemText>
            </ListItem>

            <ListItem style={{backgroundColor: '#8BBD24'}} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText> Ok </ListItemText>
            </ListItem>

            <ListItem style={{backgroundColor: 'white'}} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText align="right"> Har du fått den</ListItemText>
            </ListItem>

            <ListItem style={{backgroundColor: '#8BBD24'}} className="patientItem"  variant="contained" size="large" color="primary"  startIcon={<Call fontSize="large" /> } >  
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText> Ikke ennå</ListItemText>
            </ListItem>
            )
            
            <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
                <TextField InputLabelProps={{style: {fontSize: 30, color:'black'}}} helperText="skriv melding"    focused> </TextField> 
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 10}}>
                <Button variant="contained" size="medium" color="primary"  > Send melding </Button>
                <Button variant="contained" size="medium" color="primary"  > Send fil </Button>       
                </div>
        
            </div>
 
               
            
        </div>
    )
}