import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Panel, Button, Notification } from "rsuite";

const CreditCard = (props) => {
    const [tipo, setTipo] = useState("Credito")
    const [numero, setNumero] = useState("12345")
    const [fecha, setFecha] = useState("12345")
    const [csv, setCsv] = useState("274")
    const [nombre, setNombre] = useState("Kimberly Soto Vargas")


    const cancelarTransaction = async () => {
        const res = await axios.put(`https://andrey1997acer.codes/api/transaction-cancel/${props.transaction.x_trans_id}`, {
            status: 3
        });

        console.log(res);
        props.setRouter("login")

    }
    const pago = async () => {
        const pago = await axios.post("https://andrey1997acer.codes/api/pay", {
            tipo: tipo,
            numero: numero,
            fecha: fecha,
            csv: csv,
            nombre: nombre

        });

        if (pago) {
            if (pago.data.status === true) {
                Notification["success"]({
                    title: "Estado de la transacción",
                    description: `La transaccion se realizo satisfactariamente`,
                    duration: 3000,
                });
                props.setRouter("transaction")
            }else {
                Notification["error"]({
                    title: "Estado de la transacción",
                    description: `La transaccion fue denegada`,
                    duration: 3000,
                });
            }
        }

    }

    const validarPago = () => {
        if (!tipo || !numero || !fecha || !csv || !nombre) {
            Notification["error"]({
                title: "Error",
                description: `All fields are required`,
                duration: 3000,
            });
        } else {
            pago()

        }
    }
    return (<>
        <div>
            <h1 className="text-center">Datos de Tarjeta</h1>
            <div className="container m-4">
                <Panel bordered style={{ background: "#F1F3F4" }}>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Tipo de tarjeta</h5>
                        <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option key="100" value="100">Credito</option>
                            <option key="101" value="101">Debito</option>
                        </select>

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Número de tarjeta</h5>
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
                        style={{ float: "right", marginLeft: 6 }}

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
                        style={{ float: 'right' }}
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