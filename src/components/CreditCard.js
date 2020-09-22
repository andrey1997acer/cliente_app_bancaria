import axios from 'axios';
import React from 'react';

const CreditCard = (props) => {
    const cancelarTransaction =async ()=>{
       const res =  await axios.put(`http://localhost:4000/api/transaction-cancel/${props.transaction.x_trans_id}`,{
            status:3
        });

        console.log(res);
    
    }
    return ( <>
    <div>
        <button onClick={()=>cancelarTransaction()}>Cancel</button>
    </div>
    </> );
}
 
export default CreditCard;