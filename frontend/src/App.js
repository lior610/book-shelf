import './App.css';
import Header from './Components/header';
import Book from './Components/book'

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Book name="The Hunger Games" author="Suzan Collins" pages="496" languages={["hebrew", "english"]} price="14.99"
          imageUrl="https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg" />
      </div>
    </div>
  );
}

export default App;
