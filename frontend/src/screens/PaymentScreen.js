import React from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentScreen = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
    </FormContainer>
  );
};

export default PaymentScreen;
