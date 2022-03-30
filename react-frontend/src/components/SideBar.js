

import { Button, TextField } from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useContext, useState} from 'react';
import { SocketContext } from '../utils/SocketContext';
import {  Call, FileCopy } from '@material-ui/icons';



export default function SideBar() {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setidToCall] = useState('')
  return (
    <>
            <div className="sidebar">
                {callAccepted && !callEnded  ?(      
                        <Button variant="contained" size="large" color="primary"  onClick={() => {
                            leaveCall()
                         } }> Avslutt samtalen </Button>
                    ):(
                        <div>
                            <TextField id="standard-basic"  value={idToCall} label="kode" helperText="Skriv inn koden til personen du vil ringe"   focused onChange={(event)=>{
                                setidToCall(event.target.value)
                            }} />
                                <Button variant="contained" size="large" color="primary"  onClick={() => {
                                callUser(idToCall)
                                console.log(idToCall)
                                    
                                } } startIcon={<Call fontSize="large" /> }>  </Button>
                            </div>

                    )}
                       
            
                        <CopyToClipboard text={me} >
                            <Button variant="contained"  size="large" color="secondary" onClick={ () => {console.log(me)}} startIcon={<FileCopy fontSize="large" /> } > Kopier din kode</Button>

                        </CopyToClipboard>
                </div>

    
    </>
  );
}
