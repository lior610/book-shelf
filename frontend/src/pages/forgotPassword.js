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
import Header from '../Components/header'
import CryptoJS from 'crypto-js';

const API_URL = `${window.runtime.REACT_APP_LOGIN_API}password-reset`

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function ForgotPassword() {
    const [errorMeesage, setErrorMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = CryptoJS.SHA256(formData.get('password')).toString(CryptoJS.enc.Hex);
        const confirmPassword = CryptoJS.SHA256(formData.get('confirmPassword')).toString(CryptoJS.enc.Hex);

        if (password !== confirmPassword) {
            setErrorMessage(<Typography variant='body2' color='error' align="center" sx={{
                fontWeight: "bold",
                fontSize: "1.2rem"
            }}>The password didn't match, Try again.</Typography>)
        } else {
            try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            
            if (response.ok) {
                const data = await response.json();
                if(data['state'] === "password_changed"){
                    console.log("user added");
                    setErrorMessage('');
                    window.location.href = '/'; //relative to domain
                } else if (data['state'] === "username_not_exist") {
                    setErrorMessage(<Typography variant='body2' color='error' align="center" sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                    }}>Username does not exist, create new user.</Typography>)
                }
            } else {
                // Login failed, handle accordingly
                console.error('server problem');
            }
            } catch (error) {
            console.error('Error during login:', error);
            }
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
          </Avatar>
          <Typography component="h1" variant="h5">
            Fogrot My Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="user-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change My Password
            </Button>
            { errorMeesage }
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  I remeber my password
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