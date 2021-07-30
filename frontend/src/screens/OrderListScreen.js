import React, { useEffect, useState } from 'react';
import { Table, Button, ListGroup, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ModalConfirmation from '../components/ModalConfirmation';
import {
  getAllOrders,
  markOrderAsDeliveredById,
} from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const allOrders = useSelector((state) => state.allOrders);
  const { orders, loading, error } = allOrders;

  const [modalShow, setModalShow] = useState(false);
  const [orderToChange, setOrderToChange] = useState({});

  const orderUpdate = useSelector((state) => state.orderUpdate);
  const { loading: loadingUpdate, success, error: errorUpdate } = orderUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push('/');
    }
  }, [dispatch, history, user.isAdmin, success]);

  const markAsDelivered = (id) => {
    dispatch(markOrderAsDeliveredById(id));
    setModalShow(false);
    setOrderToChange({});
  };

  return (
    <>
      {loading || loadingUpdate ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {errorUpdate ? <Message>{errorUpdate}</Message> : null}

          <Table bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order Items</th>
                <th>Payment Result</th>
                <th>Total Price</th>
                <th>Delivery Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <Link to={`/order/${order._id}`}>
                    <td>{order._id}</td>
                  </Link>

                  <td>
                    {order.orderItems.map((product) => (
                      <ListGroup.Item key={product._id}>
                        <Row>
                          <Col lg={2}>
                            <span className=' d-none d-lg-block'>
                              <Image
                                fluid
                                rounded
                                alt={product.name}
                                src={product.image}
                              />
                            </span>
                          </Col>
                          <Col>
                            <Link to={`/product/${product._id}`}>
                              {product.name}
                            </Link>{' '}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </td>
                  <td>{order.paymentResult.status}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isDelivered ? (
                      <i class='far fa-check-square'></i>
                    ) : (
                      <i class='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        setModalShow(true);
                        setOrderToChange(order);
                      }}
                      variant='danger'
                    >
                      {' '}
                      <i class='fas fa-truck'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {/* This is a modal that pops up to show a confirmation message before executing any sensitive functionalities */}
      <ModalConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        submit={() => markAsDelivered(orderToChange._id)}
        message={`Are you sure you would like mark this order as Delivered?`}
      />
    </>
  );
};

export default OrderListScreen;
