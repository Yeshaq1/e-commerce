import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import PaymentForm from '../components/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51HIEIPEcQGt6LPFFU9Nc3WGFsoAndNPoLVF5Yeuf3oZwsUyjY9WbtnpkePSEy3to4y6zYGK2ukmkA2ieH8HehfIk00DLPKvsnE'
);

const PlaceOrderScreen = ({ history }) => {
  const cartDetail = useSelector((state) => state.cartDetail);
  const { shippingAddress, paymentMethod, cartProducts } = cartDetail;

  const { address, city, postalCode, country } = shippingAddress;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  cartDetail.itemsPrice = cartProducts
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  // shipping cost here is fixed based on the value of purchase. This can be adjusted to be a variable amount.
  cartDetail.shippingPrice = cartDetail.itemsPrice > 500 ? 0 : 10;

  // Tax here is set to 15%, this can be adjusted depending on the State/Province
  cartDetail.taxPrice = (
    (Number(cartDetail.shippingPrice) + Number(cartDetail.itemsPrice)) *
    0.15
  ).toFixed(2);

  cartDetail.totalPrice = (
    Number(cartDetail.itemsPrice) +
    Number(cartDetail.shippingPrice) +
    Number(cartDetail.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    } else if (cartProducts.length < 1) {
      history.push('/cart');
    }

    // eslint-disable-next-line
  }, [history, success]);

  return (
    <Fragment>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 step4 />
      </FormContainer>
      <Row>
        <Col md={7}>
          <ListGroup>
            {error && <Message variant='danger'>{error}</Message>}
            <ListGroup.Item>
              <h2>Shipping Information</h2>
              <p>
                <strong>Address:</strong> {address}, {city}, {country},{' '}
                {postalCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              Method: {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Details</h2>
              <ListGroup variant='flush'>
                {cartProducts.map((product) => (
                  <ListGroup.Item key={product._id}>
                    <Row>
                      <Col xs={2} lg={1}>
                        <Image
                          fluid
                          rounded
                          alt={product.name}
                          src={product.image}
                        />
                      </Col>
                      <Col>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>{' '}
                      </Col>
                      <Col xs={5} md={5}>
                        {' '}
                        {product.qty} x {product.price} = ${' '}
                        {(product.qty * product.price).toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Subtotal: </Col>
                  <Col>${cartDetail.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${cartDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${cartDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${cartDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Elements stripe={promise}>
                  <PaymentForm />
                </Elements>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrderScreen;
