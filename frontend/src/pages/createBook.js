import React, { useState } from 'react';
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
import { InputAdornment } from '@mui/material';

const API_URL = "http://localhost:8000/signup"

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateBook() {
    const [errorMeesage, setErrorMessage] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const fullname = formData.get('fullName');
        const email = formData.get('email')
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
                body: JSON.stringify({ fullname, username, email, password }),
            });
            
            if (response.ok) {
                console.log("user added");
                setErrorMessage('');
                window.location.href = '/'; //relative to domain
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
        <Typography component="h1" variant="h3" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>
            Add a new book
        </Typography>

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, marginTop: "50px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="book Name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Book Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="author"
                  label="Author"
                  name="author"
                  autoComplete="author"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="book_photo_url"
                  label="Image Url"
                  name="book_photo_url"
                  autoComplete="Image Url"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="num_pages"
                  label="Pages Number"
                  type="number"
                  id="num_pages"
                  autoComplete="100"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  id="price"
                  InputProps={{
                    endAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  autoComplete="price"
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
              Sign Up
            </Button>
            { errorMeesage }
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}