import './App.css';
import Header from './Components/header';
import Book from './Components/book'

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Book />
      </div>
    </div>
  );
}

export default App;
