

import { Button, Typography } from '@material-ui/core';
import {React, useRef, useEffect,useState, useContext} from 'react';
import { SocketContext } from '../utils/SocketContext'
import { Settings, Call, Chat, Work,Cast } from '@material-ui/icons';

import {useLocation} from 'react-router-dom'

export default function Video({setChatOn,WhoICall}) {
      const { sessionStarted, myVideo, userVideo, sessionEnded, call, leaveSession } = useContext(SocketContext);
      const [videoStyle, setVideoStyle] = useState('video')
      const { state } = useLocation();

      

      useEffect(() => {
            if(sessionStarted) {
                  setVideoStyle("video-accepted");

            }else{
                  setVideoStyle("video");
            }

      }, [sessionStarted])

  


  return (
        <div className={videoStyle}>
       
              {
                sessionStarted && !sessionEnded ? 
                (
                <div>
                  {state.isLogoped ?           <Typography  className="nameTag" variant="h4" align="center">{WhoICall}</Typography>
                        :
                        <Typography  className="nameTag" variant="h4" align="center">{call.name}</Typography>
                        
                         }
        
                  <video playsInline  ref={userVideo} autoPlay />
                  <div className="callAccepted-menu"> 
                        <Button  startIcon={<Call fontSize="small" style={{color: '#F08080'}} /> } style={{ width: 150, fontWeight: 'bold' ,marginBottom:5,  backgroundColor: '#F08080'}} variant="contained" size="small" color="primary"  onClick={() => {
                              leaveSession()
                              } }>  
                              Avslutt 

                              </Button>
                        <Button label="chat" color="primary"  startIcon={<Chat style={{size:'larger'}} fontSize="large" /> } style={{ width: 150,fontWeight: 'bold' , marginBottom:5}} variant="contained" size="small" color="primary"  onClick={() => {
                              setChatOn( v => !v) 
                        } }>  Meldinger
                        </Button>   
                        <Button  startIcon={<Cast fontSize="small" /> } style={{ width: 150 , fontWeight: 'bold' ,  marginBottom:5}} variant="contained" size="small" color="primary"  onClick={() => {
                              leaveSession()
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

