

import { Button, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Notifications from './Notifications';
import { Settings, Call, Chat,VideoCall } from '@material-ui/icons';
import { SocketContext } from '../../utils/SocketContext'
export default function Toolbar({children, setonSideBar}) {
    

    const { state } = useLocation();
    const { setName } = useContext(SocketContext);

    useEffect(() => {
      setName(state.username)
    }, [state])
  return (
    <>
 
    <div className="toolbar">

        <Button variant="contained" size="large" color="primary"  startIcon={<Settings fontSize="large" /> } > Kontrollpanel </Button>
        { /*
          <Button variant="contained" size="large" color="primary" startIcon={<Chat fontSize="large" /> } > Meldinger </Button>
          */
        }

        {children}
    </div>   
    </>
  );
}
