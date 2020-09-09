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

  return (
    <div className="App container">
     {isLogin? <Login setIsLogin={setIsLogin}/>: <Transaction />}
    </div>
  );
}

export default App;
