

import { Button } from '@material-ui/core';
import React, {useContext, useEffect} from 'react';
import { SocketContext } from '../../utils/SocketContext'
import {  Call } from '@material-ui/icons';


const Notifications = () => {
  const { answerLogoped, call, sessionStarted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !sessionStarted && (
        <div className="notification" >
          <h3>logopeden {call.name} ringer deg</h3>
          <Button variant="contained" color="primary"  onClick={answerLogoped}  startIcon={<Call fontSize="large" /> }>
            Svar
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;