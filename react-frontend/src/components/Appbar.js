

import { AppBar, Typography } from '@material-ui/core';
import React from 'react';

export default function Appbar() {
  return (
    <>
    <AppBar position="static" color="primary">
            <Typography variant="h4" align="center"  > Telelogopedi Nettportal Prototype </Typography>
        </AppBar>
    </>
  );
}
