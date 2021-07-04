import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

const RegisterScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const authDetail = useSelector((state) => state.authDetail);
  const { error, loading, user } = authDetail;

  const [credentials, updateCredentials] = useState({
    password: '',
    email: '',
    name: '',
  });

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const { password, email, name } = credentials;

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
    dispatch(register(credentials));
  };

  return (
    <Row>
      <h1>Sign Up</h1>
      {error ? <Message variant='danger'>{error}</Message> : null}
      {loading && <Loader />}
      <Row>
        <Col md={6}>
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
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className='py-3'>
        <Col>
          Existing Customer? <Link to='/login'>Login</Link>
        </Col>
      </Row>
    </Row>
  );
};

export default RegisterScreen;
