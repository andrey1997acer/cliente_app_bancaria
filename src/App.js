import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Buttons/Button";
import "rsuite/dist/styles/rsuite-default.css";
import { Notification } from "rsuite";
import Login from "./components/Buttons/Login";
import Transaction from "./components/Transactions";

function App() {
 const [isLogin, setIsLogin] = useState(true);
 const [token, setToken] = useState("");
 const [id, setId] = useState("");

 console.log(`Valor dewl token desde app ${token}`)


  return (
    <div className="App container">
     {isLogin? <Login setIsLogin={setIsLogin} setToken={setToken} setId={setId}/>: <Transaction token={token}  id={id}/>}
    </div>
  );
}

export default App;
