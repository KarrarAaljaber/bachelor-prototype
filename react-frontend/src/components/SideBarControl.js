import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Typography, Stack } from "@material-ui/core";
import { VolumeDown, VolumeUp } from "@material-ui/icons";



export default function SideBarControl (){

    return(
        <div className="sidebar-left" style={{display: 'flex', flexDirection: 'column', gap:30, justifyContent: 'space-between'}}>
            <Typography variant="h6" align="center"  style={{fontSize: 25}} >  Kontrollpanel </Typography>
            
                <Typography variant="h6" align="center"> Tekststørrelse </Typography>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 20}}>
                    <Button variant="contained" size="small" color="primary"> Liten </Button>
                    <Button variant="contained" size="medium" color="primary"> Medium </Button>
                    <Button variant="contained" size="large" color="primary"> Stor </Button>

                </div>
                <div  > 
                <Typography variant="h6" align="center"> Chatplassering </Typography>

                <FormControl  style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="høyre"
                        name="radio-buttons-group"
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
                    >
                        <FormControlLabel value="høyre" control={<Radio />} label="Høyre" />
                        <FormControlLabel value="venstre" control={<Radio />} label="Venstre" />
                    </RadioGroup>
                </FormControl>

                </div>
                <Typography variant="h6" align="center"> Lydnivå </Typography>

                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                   
                    <VolumeDown />
                    <Slider aria-label="Volume"   />
                    <VolumeUp />

                </div>
            
        </div>
    )
}