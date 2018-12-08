import React from 'react'
import axios from 'axios';
import {message} from "./../../components/alerts"
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'EUR';

const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
 
  if(data){
    const {data:{code}} = data
    if(code=="400"){
      message.error('payment was unsuccessfull',1,()=>{
        //window.location.reload()
        console.log(data)
      })
    }else{
      localStorage.setItem('payment', 1);
       message.info('payment successful',1,()=>{
         window.location.reload()
       })
      window.location.reload()
      console.log(data);
    } 
  }
  
};

const errorPayment = data => {
    message.error('payment error !',1,()=>{
      window.location.reload()
    })
  //console.log(data);
};

const onToken = (amount,description ,planId,email,subscription) => token =>{
 
  console.log({amount,planId,token})
  axios.post('/api/stripe',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromEuroToCent(amount),
      planId,
      email,
      subscription
    })
    .then(successPayment)
    .catch(errorPayment);
   
}
  

const Checkout = ({name, description, amount,planId,email,subscription}) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromEuroToCent(amount)}
    token={onToken(amount, description,planId,email,subscription)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;