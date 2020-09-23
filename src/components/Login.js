import React, { useState,useEffect} from "react";
import axios from "axios";
import { Panel, Button, Notification } from "rsuite";


const Login = (props) => {
  const [email, setEmail] = useState("andreyfdelgado@gmail.com");
  const [pass, setPass] = useState("0000");
  const [getToken, setGetToken] = useState(false);
  

  useEffect(()=>{

    const loginHandled = async () => {
      const login = await axios.post("https://andrey1997acer.codes/api/login", {
        email: email,
        password: pass,
      });
  
     
  
  
      if (login.data.status) {
          props.setToken(login.data.token)
          props.setRouter('transaction')
  
  
      } else {
          props.setRouter('login')
          Notification["error"]({
          title: "Aviso",
          description: `Email or password incorrect`,
          duration: 3000,
        });
      }
    };

  if(getToken){
    loginHandled()
  }
    
    
  },[getToken])

  return (
    <>
      <h1 className="text-center">Login</h1>
      <div className="container m-4">
      <Panel bordered style={{ background: "#F1F3F4" }}>
        <div className="form-row ">
          <div className="form-group col-md-12">
            <h5 className="text-center">Email</h5>
            <input
              type="text"
              className="form-control"
              onChange={(valor) => setEmail(valor.target.value)}
              value={email}
            />
          </div>
          <div className="form-group col-md-12">
            <h5 className="text-center">Password</h5>
            <input
              type="password"
              className="form-control"
              onChange={(valor) => setPass(valor.target.value)}
              value={pass}
            />
          </div>

          <div className="form-group col-md-12">
            <Button
              onClick={()=>{
                setGetToken(true)
              }}
              alt="Iniciar Sesión"
              appearance="primary"
              style={{ float: "right" }}
            >
              {" "}
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </Panel>
      </div>
    </>
  );
};

export default Login;
