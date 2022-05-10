

import { Button, Typography } from '@material-ui/core';
import {React, useRef, useEffect,useState, useContext} from 'react';
import { SocketContext } from '../utils/SocketContext'
import { Settings, Call, Chat } from '@material-ui/icons';

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
                stream &&    
                <div>
               
                  <video playsInline muted ref={myVideo} autoPlay />
                  <Typography style={{backgroundColor: 'rgb(63,81,181)', color: 'white'}} variant="h4" align="center">
                  {callAccepted && !callEnded  &&    
                        <Button  startIcon={<Call fontSize="large" /> } style={{ width: 50,marginRight: 10, marginBottom:10, backgroundColor: 'red'}} variant="contained" size="small" color="primary"  onClick={() => {
                            leaveCall()
                         } }>  </Button>
                  }       
                        {state.username}
                 
                  </Typography>
                   </div>
                   
 
              } 
              {
                callAccepted && !callEnded &&
                <div>
                  <video playsInline  ref={userVideo} autoPlay />
                  <Typography style={{backgroundColor: 'rgb(63,81,181)', color: 'white'}} variant="h4" align="center"> {call.name}</Typography>

                   </div>
              }


        </div>
    
  );
}

