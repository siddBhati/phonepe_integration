import React, { useState } from 'react';
import '../paypal/paypal.css';
import axios from 'axios';
import phonepe from '../../image/phonepe.png'

const Phonepe = () => {
    const [loading2, setLoading2] = useState(false);

    const data ={
        name: 'Siddharth',
        amount: 1,
        number: '7498608775',
        MUID: "MUID12345678",
        transactionId: 'T123456789asdfghjkl',
    }

    const handlePayment = (e)=>{
        e.preventDefault();
        setLoading2(true);
        axios.post('http://localhost:5000/api/payment', {...data}).then(response => {  // , { withCredentials: true }
         
        
        window.location.href = response.data
    })
        .catch(error => {
            setLoading2(false)
            console.error(error);
        });   
    }
  return (
    <>
    <div className='main'>
        <div className='center'>
            <img width={300} src={phonepe} alt="" />
            <h2 className='fs-4 mt-2'><span className='text-danger fw-bold'>LIVE</span> Payment Integration</h2>
        </div>
        <div className='card px-5 py-4 mt-5'>
            <form onSubmit={handlePayment}>
                <div className='col-12 '>
                    <p className='fs-5'><strong>Name:</strong> {data.name}</p>
                </div>
                <div className='col-12 '>   
                    <p className='fs-5'><strong>Number:</strong> {data.number}</p>
                </div>
                <div className='col-12 '>
                    <p className='fs-5'><strong>Amount:</strong> {data.amount}Rs</p>
                </div>
                {!loading2? <div className='col-12 center'>
                    <button className='w-100 ' type="submit">Pay Now</button>
                </div>
                :
                <div className='col-12 center'>
                    <button className='w-100 text-center' type="submit">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden ">Wait...</span>
                    </div>
                    </button>
                </div>
                }
            </form>
        </div>
    </div>
    <p className='m-0'>@codesense24</p>
    <p className='' style={{fontSize: "14px"}}>Subscribe my youtube channel</p>
    </>
  )
}

export default Phonepe
