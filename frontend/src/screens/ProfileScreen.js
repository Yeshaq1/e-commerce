import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../actions/profileActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrders } from '../actions/orderActions';

const ProfileScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const profileDetail = useSelector((state) => state.profileDetail);
  let { error, loading, userProfile, success } = profileDetail;

  const myOrders = useSelector((state) => state.myOrders);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrders;

  const [credentials, updateCredentials] = useState({
    password: '',
    email: '',
    name: '',
  });

  const { password, email, name } = credentials;

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getOrders());

    updateCredentials({
      email: userProfile.email,
      name: userProfile.name,
    });
  }, [dispatch, userProfile.email, userProfile.name, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateCredentials((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(credentials));
  };

  return (
    <Row>
      {error ? <Message variant='danger'>{error}</Message> : null}
      {success ? <Message variant='success'>Profile Updated</Message> : null}
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <h1>USER PROFILE</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Name'
                  value={name}
                  name='name'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  name='email'
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='password'
                  name='password'
                  value={password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className='mt-4'>
                <Button className=' col-12 col-md-4' type='submit'>
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col md={9}>
            <h1>My Orders</h1>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>

                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice}</td>

                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light'>Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default ProfileScreen;
