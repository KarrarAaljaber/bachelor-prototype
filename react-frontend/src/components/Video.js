

import {React, useRef, useEffect,useState, useContext} from 'react';
import { SocketContext } from '../utils/SocketContext';

export default function Video() {
      const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
      const [videoStyle, setVideoStyle] = useState('video')
      
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
                   (<video playsInline muted ref={myVideo} autoPlay />)
 
              } 
              {
                callAccepted && !callEnded &&
                    (<video playsInline  ref={userVideo} autoPlay />)
 
              }


        </div>
    
  );
}

