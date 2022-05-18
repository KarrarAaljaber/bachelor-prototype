

import { Button, Typography } from '@material-ui/core';
import {React, useRef, useEffect,useState, useContext} from 'react';
import { SocketContext } from '../utils/SocketContext'
import { Settings, Call, Chat, Work,Cast } from '@material-ui/icons';

import {useLocation} from 'react-router-dom'

export default function Video() {
      const { name, callAccepted, myVideo, userVideo, callEnded, stream, call, leaveCall } = useContext(SocketContext);
      const [videoStyle, setVideoStyle] = useState('video')
      const { state } = useLocation();

      

      useEffect(() => {
            if(callAccepted) {
                  setVideoStyle("video-accepted");

            }else{
                  setVideoStyle("video");
            }

      }, [callAccepted])

  


  return (
        <div className={videoStyle}>
       
              {
                callAccepted && !callEnded ? 
                (
                <div>
                  <video playsInline  ref={userVideo} autoPlay />
                  <div className="callAccepted-menu"> 
                        <Button  startIcon={<Call fontSize="small" style={{color: 'red'}} /> } style={{ width: 150, marginBottom:5,  backgroundColor: 'red'}} variant="contained" size="small" color="primary"  onClick={() => {
                              leaveCall()
                              } }>  
                              Avslutt 

                              </Button>
                        <Button label="workplace" color="primary"  startIcon={<Work style={{size:'larger'}} fontSize="large" /> } style={{ width: 150, marginBottom:5, border: '1px solid black'}} variant="contained" size="small" color="primary"  onClick={() => {
                              
                        } }>  Workplace
                        </Button>   
                        <Button  startIcon={<Cast fontSize="small" /> } style={{ width: 150 ,  marginBottom:5,border: '1px solid black'}} variant="contained" size="small" color="primary"  onClick={() => {
                        leaveCall()
                        } }>  dele skjerm
                        </Button>   
                  </div>
                  <div className=""> 

                  </div>
  
               
                  
                  </div>)
                  :
                  (       
                        <div>
               
                              <video playsInline muted ref={myVideo} autoPlay />
                              <Typography  className="nameTag" variant="h4" align="center">
                              
                                    {state.username}
                              </Typography>
                        
                        </div>
                        )
              }


        </div>
    
  );
}

