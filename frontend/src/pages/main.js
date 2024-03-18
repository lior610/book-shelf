import './main.css';
import Header from '../Components/header';
import BooksList from '../Components/booksList';
import { LanguageFilter, GenreFilter } from '../Components/langGenre';
import React, { useEffect, useState } from 'react';
import useFetch from '../useFetch';

const API_URL = "http://localhost:5001/";
const LANGUAGE_API_URL = `${API_URL}languages`;
const GENRES_API_URL = `${API_URL}genres`;

function LoadingIndicator({ loadingMessage }) {
  return <p>{loadingMessage}</p>;
}

function ErrorHandler({ errorMessage }) {
  return <div>Error: {errorMessage}</div>;
}

function Main() {
  const [filters, setFilters] = useState({ language: '', genre: '' });
  const [url, setUrl] = useState(API_URL);

  const { data: books, loading: booksLoading, error: booksError } = useFetch(url);
  const { data: languages, loading: languagesLoading, error: languagesError } = useFetch(LANGUAGE_API_URL);
  const { data: genres, loading: genresLoading, error: genresError } = useFetch(GENRES_API_URL);

  useEffect(() => {
    let chosen_url = !filters.language && !filters.genre
      ? API_URL
      : !filters.language && filters.genre
      ? `${API_URL}genre/${filters.genre}`
      : filters.language && !filters.genre
      ? `${API_URL}language/${filters.language}`
      : `${API_URL}filter/${filters.genre}/${filters.language}`;
  
    setUrl(chosen_url);
  }, [filters]);

  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: value
    }));
  };

  console.log(url);

  return (
    <div className="App">
      <Header />
      {languagesLoading ? <LoadingIndicator loadingMessage="Loading languages..." /> : <LanguageFilter languages={languages} onLanguageChange={value => handleFilterChange('language', value)} />}
      {genresLoading ? <LoadingIndicator loadingMessage="Loading genres..." /> : <GenreFilter genres={genres} onGenreChange={value => handleFilterChange('genre', value)} />}
      {booksError || languagesError || genresError ? <ErrorHandler errorMessage="Unable to fetch data" /> : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {booksLoading ? <LoadingIndicator loadingMessage="Loading books..." /> : <BooksList books={books} />}
        </div>
      )}
    </div>
  );
}

export default Main;