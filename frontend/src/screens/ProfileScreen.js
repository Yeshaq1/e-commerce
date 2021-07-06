import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../actions/profileActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = ({ history, location }) => {
  const dispatch = useDispatch();

  const profileDetail = useSelector((state) => state.profileDetail);
  let { error, loading, userProfile, success } = profileDetail;

  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const [credentials, updateCredentials] = useState({
    password: '',
    email: '',
    name: '',
  });

  const { password, email, name } = credentials;

  useEffect(() => {
    dispatch(getProfile());

    updateCredentials({
      email: userProfile.email,
      name: userProfile.name,
    });
  }, [dispatch, userProfile.email, userProfile.name, user, history]);

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
          <Col md={6}>
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
          <Col>
            <h1>MY ORDERS</h1>
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default ProfileScreen;
