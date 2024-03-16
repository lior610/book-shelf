import './App.css';
import Header from './Components/header';
import BooksList from './Components/booksList';
import { LanguageFilter, GenreFilter } from './Components/langGenre';
import React from 'react';
import useFetch from './useFetch';

const API_URL = "http://localhost:5001/";
const LANGUAGE_API_URL = `${API_URL}languages`;
const GENRES_API_URL = `${API_URL}genres`;

function App() {
  const { data: books, loading: booksLoading, error: booksError } = useFetch(API_URL);
  const { data: languages, loading: languagesLoading, error: languagesError } = useFetch(LANGUAGE_API_URL);
  const { data: genres, loading: genresLoading, error: genresError } = useFetch(GENRES_API_URL);

  if (booksError || languagesError || genresError) {
    return <div>Error: Unable to fetch data</div>;
  }

  return (
    <div className="App">
      <Header />
      {languagesLoading ? <p>Loading languages...</p> : <LanguageFilter languages={languages} />}
      {genresLoading ? <p>Loading genres...</p> : <GenreFilter genres={genres} />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {booksLoading ? <p>Loading books...</p> : <BooksList books={books} />}
      </div>
    </div>
  );
}

export default App;
