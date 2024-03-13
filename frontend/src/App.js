import './App.css';
import Header from './Components/header';
import BooksList from './Components/booksList';
import { LanguageFilter, GenreFilter } from './Components/filter';
import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:5001/"

function App() {
  const [books, setBooks] = useState([]);
  
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="App">
      <Header />
      <LanguageFilter />
      <GenreFilter />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BooksList books={ books } />
      </div>
    </div>
  );
}

export default App;
