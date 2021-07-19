import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderById } from '../actions/orderActions';

const OrderConfirmationScreen = ({ history, match }) => {
  const orderById = useSelector((state) => state.orderById);

  const { order, loading, error } = orderById;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Shipping Information</h2>
                <span>{order.user?.name}</span>
                <p>
                  <strong>Address:</strong> {order.shippingAddress?.address},{' '}
                  {order.shippingAddress?.city},{' '}
                  {order.shippingAddress?.country},{' '}
                  {order.shippingAddress?.postalCode}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                Method: {order.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Details</h2>
                <ListGroup variant='flush'>
                  {order.orderItems?.map((product) => (
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
              <ListGroup.Item>
                <h2>Delivery Status</h2>
                <div>
                  {order.isDelivered ? (
                    <Message>Your order has been delivered</Message>
                  ) : (
                    <Message>Your order will be delivered shortly</Message>
                  )}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping: </Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax: </Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total: </Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default OrderConfirmationScreen;
