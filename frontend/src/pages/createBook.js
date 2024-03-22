import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Components/header'
import { InputAdornment } from '@mui/material';
import ChipSelect from '../Components/chipSelect';
import useFetch from '../useFetch';
import { LoadingIndicator} from '../Components/loadingError';

const API_URL = "http://localhost:5001/";
const LANGUAGE_API_URL = `${API_URL}languages`;
const GENRES_API_URL = `${API_URL}genres`;
const ADD_BOOK_URL = `${API_URL}Add`

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateBook() {
    const { data: languages, loading: languagesLoading } = useFetch(LANGUAGE_API_URL);
    const { data: genres, loading: genresLoading } = useFetch(GENRES_API_URL);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const book_photo_url = formData.get('book_photo_url');
        const author = formData.get('author')
        const price = formData.get('price')
        const num_pages = formData.get('num_pages');
        const languages = formData.get("languages").split(",");
        const genres = formData.get("genres").split(",");
        console.log(JSON.stringify({ name, book_photo_url, author, price, num_pages, languages, genres }))

        
        try {
          const response = await fetch(ADD_BOOK_URL, {
          method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, book_photo_url, author, price, num_pages, languages, genres }),
            });
            
            if (response.ok) {
                console.log("book added");
                //window.location.href = '/main'; //relative to domain
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
              <Grid item xs={12} sm={6}>
                {languagesLoading ? <LoadingIndicator loadingMessage="Loading Languages..." /> : <ChipSelect name="languages" values={languages}/>}
              </Grid>
              <Grid item xs={12} sm={6}>
                {genresLoading ? <LoadingIndicator loadingMessage="Loading Genres..." /> : <ChipSelect name="genres" values={genres}/>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add!
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}