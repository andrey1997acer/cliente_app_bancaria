import React, { useState } from "react";
import { Panel, Button, Notification } from "rsuite";
import axios from "axios";
import crypto from 'crypto-js'


const Transaction = (props) => {
    const [x_amount, setx_amount] = useState("");
    const [x_invoice_num, setx_invoice_num] = useState("");
    const [x_fp_sequence, setx_fp_sequence] = useState("");
    const [x_fp_timestamp, setx_fp_timestamp] = useState("");
    const [x_fp_hash, setx_fp_hash] = useState("");
    const [x_test_request, setx_test_request] = useState(false);
    const [x_show_form, setx_show_form] = useState("PAYMENT_FORM’");
    const [x_currency_code, setX_currency_code] = useState('CRC');
    const [articulo, setArticulo] = useState('');

    const [isGenerado, setIsGenerado] = useState(false);


    console.log(`Los datos desde transaccion ${props.token}`)


    const pagar = async () => {

        if (x_amount && isGenerado) {
            const cadena = props.token + "^" + x_fp_sequence + "^" + x_fp_timestamp + "^" + x_amount + "^";
                const hmac = crypto.HmacMD5(cadena, 'transactionKey');
            const transaccion = await axios.post("http://localhost:4000/api/trasaction", {
                token:props.token,
                x_fp_sequence:x_fp_sequence,
                x_fp_timestamp:x_fp_timestamp,
                x_amount:x_amount,
                fingerprint:hmac.toString()
            });
            if(transaccion){
                if(transaccion.data){
                    props.setTransaction(transaccion.data);
                    // props.setFingerprint(transaccion.data.fingerprint);
                    props.setRouter('creditcard');
                }
            }
        }
    };


    const getX_fp_timestamp = async () => {
        const fecha = await axios.get("http://localhost:4000/api/date");

        if(fecha){
            setx_fp_timestamp(fecha.data.fecha)
        }

        console.log(`La fecha del backend ${fecha.data.fecha}`)

    };

    const validarPago = ()=>{
        if(!articulo || !x_amount || !x_currency_code || !x_fp_timestamp){
            return true;
        }else{
            return false;
        }
    }

    function generar() {
        getX_fp_sequence()
        getX_invoice_num()
        getX_fp_timestamp()
        setIsGenerado(true)
    }
    function getX_fp_sequence() {
        var caracteres = "123456789";
        var contrasenna = "";
        var i = 0;
        for (i = 0; i < 20; i++) contrasenna += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        setx_fp_sequence(contrasenna)

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
                <div className="form-group col-md-6">
                        <h5 className="text-center">Articulo</h5>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e)=>setArticulo(e.target.value)}
                            value={articulo}
                        />

                    </div>
                    <div className="form-group col-md-6">
                        <h5 className="text-center">Monto De La Transacción</h5>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(valor) => setx_amount(valor.target.value)}
                            value={x_amount}
                        />

                    </div>
                    <div className="form-group col-md-6">
                        <h5 className="text-center">Moneda</h5>
                        <select className="form-control" value={x_currency_code} onChange={(e)=>setX_currency_code(e.target.value)}>
                            <option key="100" value="100">CRC</option>
                            <option key="101" value="101">USD</option>
                            <option key="102" value="102">MXN</option>
                            <option key="103" value="103" >EUR</option>
                            </select>

                    </div>



                    <div className="form-group col-md-6">
                        <h5 className="text-center">Número De Factura</h5>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            //onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_fp_sequence}
                        />

                    </div>


                    <div className="form-group col-md-6">
                        <h5 className="text-center">Número Secuencial</h5>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}

                            // onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_invoice_num}
                        />

                    </div>

                    <div className="form-group col-md-6">
                        <h5 className="text-center">Fecha</h5>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}

                            //onChange={(valor) => setMonto(valor.target.value)}
                            defaultValue={x_fp_timestamp}
                        />

                    </div>


                    <Button
                        onClick={() => {
                            generar()
                        }}
                        
                        className="mr-3"
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
                        disabled={validarPago()}
                        alt="realizar pago"
                        appearance="primary"
                        color="green"
                        style={{ float:'right' }}
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