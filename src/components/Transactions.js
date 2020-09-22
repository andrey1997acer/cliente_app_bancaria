import React, { useState } from "react";
import { Panel, Button, Notification } from "rsuite";
import axios from "axios";

const Transaction = (props) => {
    const [x_amount, setx_amount] = useState("");
    const [x_invoice_num, setx_invoice_num] = useState("");
    const [x_fp_sequence, setx_fp_sequence] = useState("");
    const [x_fp_timestamp, setx_fp_timestamp] = useState("");
    const [x_fp_hash, setx_fp_hash] = useState("");
    const [x_currency_code, setx_currency_code] = useState("188");
    const [x_test_request, setx_test_request] = useState(false);
    const [x_show_form, setx_show_form] = useState("PAYMENT_FORM’");

    const [isGenerado, setIsGenerado] = useState(false);


    console.log(`Los datos desde transaccion ${props.token}`)


    const pagar = async () => {

        if (x_amount && isGenerado) {
           
            const transaccion = await axios.post("http://localhost:4000/api/trasaction", {
                id:props.id,
                token:props.token,
                x_fp_sequence:x_fp_sequence,
                x_fp_timestamp:x_fp_timestamp,
                x_amount:x_amount
            });
            console.log(`La clave encriptada del servidor ${transaccion.data.hast}`)
        }

       
    };


    const getX_fp_timestamp = async () => {
        const fecha = await axios.post("http://localhost:4000/api/date", {

        });

        setx_fp_timestamp(fecha.data.fecha)

        console.log(`La fecha del backend ${fecha.data.fecha}`)

    };

    function generar() {
        getX_fp_sequence()
        getX_invoice_num()
        getX_fp_timestamp()
        setIsGenerado(true)
    }
    function getX_fp_sequence() {
        var caracteres = "123456789";
        var contraseña = "";
        var i = 0;
        for (i = 0; i < 20; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        console.log(contraseña)
        setx_fp_sequence(contraseña)

    }
    function getX_invoice_num() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
        var contraseña = "";
        var i = 0;
        for (i = 0; i < 20; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        console.log(contraseña)
        setx_invoice_num(contraseña)
    }

    return (
        <>
            <h1 className="text-center">Transacción</h1>

            <Panel bordered style={{ background: "#F1F3F4" }}>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <h5 className="text-center">Monto De La Transacción</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(valor) => setx_amount(valor.target.value)}
                            value={x_amount}
                        />

                    </div>



                    <div className="form-group col-md-12">
                        <h5 className="text-center">Número De Factura</h5>
                        <input
                            type="text"
                            className="form-control"
                            //onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_fp_sequence}
                        />

                    </div>


                    <div className="form-group col-md-12">
                        <h5 className="text-center">Número Secuencial</h5>
                        <input
                            type="text"
                            className="form-control"
                            // onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_invoice_num}
                        />

                    </div>

                    <div className="form-group col-md-12">
                        <h5 className="text-center">Fecha</h5>
                        <input
                            type="text"
                            className="form-control"
                            //onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_fp_timestamp}
                        />

                    </div>


                    <Button
                        onClick={() => {
                            generar()
                        }}
                        alt="Generar Codigo"
                        appearance="primary"
                        style={{ float: "right" }}
                    >
                        {" "}
                        Generar Código
                     </Button>

                    <Button
                        onClick={() => {
                            pagar()
                        }}
                        alt="realizar pago"
                        appearance="primary"
                        style={{ float: "left" }}
                    >
                        {" "}
                        Realizar Pago
                     </Button>


                </div>

            </Panel>
        </>
    );
}

export default Transaction;