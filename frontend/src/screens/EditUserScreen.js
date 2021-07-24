import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUser, updateUser } from '../actions/authActions';
import FormContainer from '../components/FormContainer';
import { USER_DETAIL_RESET } from '../constants/authConstants';

const EditUserScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { user, loading, error, success } = userDetail;

  const [credentials, updateCredentials] = useState({
    email: '',
    name: '',
    isAdmin: '',
    id: '',
  });

  const { isAdmin, email, name } = credentials;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_DETAIL_RESET });
    } else {
      if (!user.name || user._id !== match.params.id) {
        dispatch(getUser(match.params.id));
      } else {
        updateCredentials({
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          id: user._id,
        });
      }
    }
  }, [dispatch, match.params.id, user, success]);

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
    dispatch(updateUser(credentials));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        {error ? <Message variant='danger'>{error}</Message> : null}
        {/* {success ? <Message variant='success'>Profile Updated</Message> : null} */}
        {loading ? (
          <Loader />
        ) : (
          <Row>
            <h1>Edit User</h1>
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
                <Form.Check
                  className='mt-4'
                  type='checkbox'
                  label='Is Admin'
                  checked={isAdmin}
                  onChange={(e) =>
                    updateCredentials((preValue) => {
                      return {
                        ...preValue,
                        isAdmin: e.target.checked,
                      };
                    })
                  }
                />
              </Form.Group>
              <Form.Group className='mt-4'>
                <Button className=' col-12 col-md-4' type='submit'>
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Row>
        )}
      </FormContainer>
    </>
  );
};

export default EditUserScreen;
