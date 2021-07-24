import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, getUsers } from '../actions/authActions';

const UserListScreen = ({ history }) => {
  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success,
    loading: userDeleteLoading,
    error: userDeleteError,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push('/');
    }
  }, [dispatch, history, user.isAdmin, success]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      {loading || userDeleteLoading ? (
        <Loader />
      ) : error || userDeleteError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
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
                    <i className='fas fa-crown'></i>
                  ) : (
                    <i className='fas fa-times'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={'/admin/user/edit'}>
                    <Button variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => deleteUserHandler(usr._id)}
                    variant='light'
                  >
                    {' '}
                    <i className='far fa-trash-alt'></i>
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
