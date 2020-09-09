import React, { useState } from "react";
import axios from "axios";
import { Panel, Button, Notification } from "rsuite";


const Login = (props) => {
  const [email, setEmail] = useState("andreyfdelgado@gmail.com");
  const [pass, setPass] = useState("0000");

  const loginHandled = async () => {
    const login = await axios.post("http://localhost:4000/api/login", {
      email: email,
      password: pass,
    });
    console.log(login);

    if (login.data.status) {
        props.setIsLogin(false)


    } else {
        props.setIsLogin(true)
      Notification["error"]({
        title: "Aviso",
        description: `Email or password incorrect`,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <h1 className="text-center">Login</h1>

      <Panel bordered style={{ background: "#F1F3F4" }}>
        <div className="form-row">
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
              onClick={loginHandled}
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
    </>
  );
};

export default Login;
