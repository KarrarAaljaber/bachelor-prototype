

import { Button } from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import { SocketContext } from '../utils/SocketContext';
import {  Call } from '@material-ui/icons';


const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h3>{call.name} is calling:</h3>
          <Button variant="contained" color="primary"  onClick={answerCall}  startIcon={<Call fontSize="large" /> }>
            Answer
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;