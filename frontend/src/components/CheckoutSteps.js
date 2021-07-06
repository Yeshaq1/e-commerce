import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>
              <i class='fas fa-sign-in-alt'></i> Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i class='fas fa-sign-in-alt'></i> Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>
              <i class='fas fa-arrow-right'></i> <i class='fas fa-truck'></i>{' '}
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i class='fas fa-arrow-right'></i> <i class='fas fa-truck'></i>{' '}
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link>
              <i class='fas fa-arrow-right'></i>{' '}
              <i class='fas fa-credit-card'></i> Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <i class='fas fa-arrow-right'></i>{' '}
            <i class='fas fa-credit-card'></i> Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link>
              {' '}
              <i class='fas fa-arrow-right'></i>{' '}
              <i class='fas fa-check-square'></i> Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            {' '}
            <i class='fas fa-arrow-right'></i>{' '}
            <i class='fas fa-check-square'></i> Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
