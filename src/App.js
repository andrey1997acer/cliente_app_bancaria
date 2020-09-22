import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Buttons/Button";
import "rsuite/dist/styles/rsuite-default.css";
import { Notification } from "rsuite";
import Login from "./components/Login";
import Transaction from "./components/Transactions";
import CreditCard from "./components/CreditCard";


function App() {
 const [router, setRouter] = useState('login');
 const [token, setToken] = useState("");
 const [fingerprint, setFingerprint] = useState("");
 const [transaction, setTransaction] = useState({});

 

 console.log(`Valor dewl token desde app ${token}`)


  return (
    <div className="App container">
     {router === 'login' ? <Login setRouter={setRouter} setToken={setToken} />
     : router ==='transaction'?<Transaction setTransaction={setTransaction} token={token}   setRouter={setRouter} setFingerprint={setFingerprint}/>
     : <CreditCard transaction={transaction} setRouter={setRouter}/>}
    </div>
  );
}

export default App;
