import axios from 'axios';
import React, { useState,useEffect} from "react";
import { Panel, Button, Notification } from "rsuite";

const CreditCard = (props) => {
    const [tipo, setTipo] = useState("Credito")
    const [numero, setNumero] = useState("")
    const [fecha, setFecha] = useState("")
    const [csv, setCsv] = useState("")
    const [nombre, setNombre] = useState("")


    const cancelarTransaction = async () => {
        const res = await axios.put(`http://localhost:4000/api/transaction-cancel/${props.transaction.x_trans_id}`, {
            status: 3
        });

        console.log(res);
        props.setRouter("login")

    }
    const pago = async () => {
        const pago = await axios.post("http://localhost:4000/api/pay", {
                tipo:tipo,
                numero:numero,
                fecha:fecha,
                csv:csv,
                nombre:nombre
            });

    }

    const validarPago = ()=>{
        if(!tipo || !numero || !fecha || !csv || !nombre){
            Notification["error"]({
                title: "Error",
                description: `All fields are required`,
                duration: 3000,
              });
        }else{
           pago() 
            
        }
    }
    return (<>
        <div>
            <h1 className="text-center">Datos de Targeta</h1>
            <div className="container m-4">
                <Panel bordered style={{ background: "#F1F3F4" }}>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Tipo de targeta</h5>
                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option key="100" value="100">Credito</option>
                            <option key="101" value="101">Debito</option>
                        </select>

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Número de targeta</h5>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setNumero(e.target.value)}
                            value={numero}
                        />

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Fecha expiración</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setFecha(e.target.value)}
                            value={fecha}
                        />

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Cvs</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCsv(e.target.value)}
                            value={csv}
                        />

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Nombre del propietario</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setNombre(e.target.value)}
                            value={nombre}
                        />

                    </div>

                    <Button
                        onClick={() => {
                            cancelarTransaction()
                        }}
                        
                        className="mr-3"
                        alt="Generar Codigo"
                        appearance="primary"
                        style={{ float: "right" }}
                    >
                        {" "}
                        Cancelar 
                     </Button>


                     <Button
                        onClick={() => {
                            validarPago()
                        }}
                        
                        alt="realizar pago"
                        appearance="primary"
                        color="green"
                        style={{ float:'right' }}
                    >
                        {" "}
                        Realizar Pago
                     </Button>

                    


                </Panel>

            </div>

        </div>
    </>);
}

export default CreditCard;