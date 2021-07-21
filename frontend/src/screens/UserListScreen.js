import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUsers } from '../actions/authActions';

const UserListScreen = ({ history }) => {
  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push('/');
    }
  }, [dispatch, history, user.isAdmin]);

  const deleteUserHandler = () => {
    console.log('deleted');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr._id}>
                <td>{usr._id}</td>
                <td>{usr.name}</td>
                <td>{usr.email}</td>
                <td>
                  {usr.isAdmin ? (
                    <i class='fas fa-crown'></i>
                  ) : (
                    <i class='fas fa-times'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={'/admin/user/edit'}>
                    <Button variant='light'>
                      <i class='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button onClick={deleteUserHandler} variant='light'>
                    {' '}
                    <i class='far fa-trash-alt'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
