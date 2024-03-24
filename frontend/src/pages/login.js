import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Components/header';
import CryptoJS from 'crypto-js';

const API_URL = "http://localhost:8000/"
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [errorMeesage, setErrorMessage] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const pass_hash = CryptoJS.SHA256(formData.get('password')).toString(CryptoJS.enc.Hex);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, pass_hash }),
      });
      
      if (response.ok) {
        // Login successful, handle accordingly (e.g., redirect)
        const data = await response.json();
        if (data['login']) {
            console.log('successful login');
            window.location.reload();
            document.cookie = "loggedIn=True; path=/"
            setErrorMessage('');
        } else {
            console.log("login failed")
            if (data['reason'] === "password_incorrect") {
                console.log("Incorrect Password")
                setErrorMessage(
                    <Typography variant='body2' color='error' align="center" sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                    }}>Password Incorrect, did you forget it?</Typography>
                );
            } else if (data['reason'] === "username_not_exist") {
                console.log("Username doesn't exist")
                setErrorMessage(
                    <Typography variant='body2' color='error' align="center" sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem"
                    }}>Username does not exist, create new account</Typography>
                );
            } else {
                console.log("Not suppose to run")
            }
        }
      } else {
        // Login failed, handle accordingly
        console.error('server problem');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             { /*<LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            { errorMeesage }
            <Grid container>
              <Grid item xs>
                <Link href="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}