import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const LoginScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const authDetail = useSelector((state) => state.authDetail);
  const { error, loading, user } = authDetail;

  const [credentials, updateCredentials] = useState({
    password: '',
    email: '',
  });

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { password, email } = credentials;

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [redirect, history, user]);

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
    dispatch(login(credentials));
  };

  return (
    <Row>
      <h1>Sign In</h1>
      {error ? <Message variant='danger'>{error}</Message> : null}
      {loading && <Loader />}
      <Row>
        <Col md={6}>
          <Form onSubmit={submitHandler}>
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
                Sign In
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to='/register'>Register</Link>
        </Col>
      </Row>
    </Row>
  );
};

export default LoginScreen;
