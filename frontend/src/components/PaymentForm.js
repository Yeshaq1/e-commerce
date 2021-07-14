import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../actions/paymentActions';
import { Button, Form } from 'react-bootstrap';
import { createOrder } from '../actions/orderActions';

export default function PaymentForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);

  const paymentIntent = useSelector((state) => state.paymentIntent);
  const { clientSecret } = paymentIntent;

  const cartDetail = useSelector((state) => state.cartDetail);
  const { totalPrice } = cartDetail;

  const authDetial = useSelector((state) => state.authDetail);
  const { user } = authDetial;

  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    dispatch(createPaymentIntent(cartDetail));
  }, [dispatch]);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
      receipt_email: 'yousefishaq@live.com',
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch(createOrder(cartDetail));
    }
  };

  return (
    <Form id='payment-form' onSubmit={handleSubmit}>
      <CardElement
        id='card-element'
        options={cardStyle}
        onChange={handleChange}
      />
      <Button
        className='stripebutton'
        disabled={processing || disabled || succeeded}
        type='submit'
      >
        <span id='button-text'>
          {processing ? (
            <div className='spinner' id='spinner'></div>
          ) : (
            'Pay now'
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {/* <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          {' '}
          Stripe dashboard.
        </a>{' '}
        Refresh the page to pay again.
      </p> */}
    </Form>
  );
}
