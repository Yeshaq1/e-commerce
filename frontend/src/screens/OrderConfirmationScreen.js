import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderById } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { resetCart } from '../actions/cartActions';

const OrderConfirmationScreen = ({ history, match }) => {
  const orderById = useSelector((state) => state.orderById);

  const { order, loading, error } = orderById;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET });
    dispatch(getOrderById(match.params.id));
    dispatch(resetCart());
  }, [dispatch, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup>
              {error && <Message variant='danger'>{error}</Message>}
              <ListGroup.Item>
                <h2>Shipping Information</h2>
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
            </ListGroup>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default OrderConfirmationScreen;
