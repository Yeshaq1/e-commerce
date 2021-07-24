import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUser, getUsers } from '../actions/authActions';
import ModalConfirmation from '../components/ModalConfirmation';

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

  const [modalShow, setModalShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

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
    setModalShow(false);
    setUserToDelete({});
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
                  <LinkContainer to={`/admin/user/${usr._id}/edit`}>
                    <Button variant='light'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                      setUserToDelete(usr);
                    }}
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
      {/* This is a modal that pops up to show a confirmation message before executing any sensitive functionalities */}
      <ModalConfirmation
        show={modalShow}
        onHide={() => setModalShow(false)}
        submit={() => deleteUserHandler(userToDelete._id)}
        message={`Are you sure you would like to delete ${userToDelete.name}'s account? this cannot be undone.`}
      />
    </>
  );
};

export default UserListScreen;
