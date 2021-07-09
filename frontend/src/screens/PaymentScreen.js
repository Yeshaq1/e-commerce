import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const cartDetail = useSelector((state) => state.cartDetail);
  const { shippingAddress, cartProducts } = cartDetail;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  if (cartProducts.length < 1) {
    history.push('/cart');
  }

  const [paymentMethod, updatePaymentMethod] = useState('paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Form.Check
            checked
            label='PayPal or Credit Card'
            type='radio'
            value='paypal'
            name='paymentMethod'
            onChange={(e) => updatePaymentMethod(e.target.value)}
          />

          <Form.Check
            label='Stripe'
            type='radio'
            value='stripe'
            name='paymentMethod'
            onChange={(e) => updatePaymentMethod(e.target.value)}
          />
        </Form.Group>
        <Button className='mt-4' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
