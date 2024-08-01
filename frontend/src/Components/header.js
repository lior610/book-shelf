import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2} color="primary" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: "bold", color: '#fff' }}> {/* Adjust typography and text color */}
            The Booksy!
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
