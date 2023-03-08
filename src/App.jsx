import BankApp from './Components/BankApp';
import AddAccount from './Components/AddAccount';
import './App.css';
import {useState} from 'react';

const KEY = 'MyReactbank'

function App() {
  
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  return (
    <div className="App">
        <AddAccount KEY={KEY} setLastRefresh={setLastRefresh}/>
        <h2>Klientų sąrašas:</h2>
        <BankApp KEY={KEY} setLastRefresh={setLastRefresh} lastRefresh={lastRefresh}/>
    </div>
  );
}


export default App;
