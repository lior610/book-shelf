import './App.css';
import Header from './Components/header';
import BooksList from './Components/booksList';
import { LanguageFilter, GenreFilter } from './Components/filter';

function App() {
  let books = [
    {
      name: "The Hunger Games",
      author: "Suzan Collines",
      pages: "496",
      languages: ["hebrew", "english"],
      price: "14.99",
      imageUrl: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      name: "The Hunger Games",
      author: "Suzan Collines",
      pages: "496",
      languages: ["hebrew", "english"],
      price: "14.99",
      imageUrl: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      name: "The Hunger Games",
      author: "Suzan Collines",
      pages: "496",
      languages: ["hebrew", "english"],
      price: "14.99",
      imageUrl: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg"
    }
  ]
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
