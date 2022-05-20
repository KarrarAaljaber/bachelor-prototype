import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


//mye av denne filen er inspirert/lånt fra 
//denne videoen https://www.youtube.com/watch?v=oxFr7we3LC8&ab_channel=JavaScriptMastery


const SocketContext = createContext();


const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const[connectedUsers, setConnectedUsers] = useState([]);

  const myVideo =  useRef()
  const userVideo = useRef();
  const connectionRef = useRef();


  function getStream(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then((currentStream) => {
      setStream(currentStream);

      myVideo.current.srcObject = currentStream;
    });
  }
  

  useEffect(async() => {
    
    await getStream();

    socket.emit('newuser', name);
    socket.on('me', (id) => setMe(id));
    socket.on('connectedUsers' , (l) => setConnectedUsers(l));
    console.log(connectedUsers);




    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, [myVideo?.current]);

  const answerLogoped = () => {
    setSessionStarted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callPatient = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setSessionStarted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveSession = () => {
    setSessionEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      call,
      sessionStarted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      sessionEnded,
      me,
      callPatient,
      leaveSession,
      answerLogoped,
      connectedUsers
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider,   SocketContext };