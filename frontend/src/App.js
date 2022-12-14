import './App.css';
import Table from "./components/table"
import FunctionSelect from "./components/function_select"
import { useEffect } from 'react';
import ExchangeRate from './components/exchangeRate';

function App() {
    // useEffect(() => getList);
    return (
      <div className="App">
        <h1>Contacts</h1>
        <Table />
        <FunctionSelect />
        <ExchangeRate />
      </div>
    );
}

export default App;
