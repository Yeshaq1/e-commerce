import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ModalConfirmation from '../components/ModalConfirmation';
import { listProducts } from '../actions/productActions';

const ProductListScreen = ({ history }) => {
  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const [modalShow, setModalShow] = useState(false);
  const [productToDelete, setProductToDelete] = useState({});

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/');
    }
  }, [dispatch, history, user.isAdmin]);

  const deleteProductHandler = (id) => {
    // dispatch(deleteProduct(id));
    setModalShow(false);
    setProductToDelete({});
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3'>
            <i className='fas fa-plus'></i>{' '}
            <span className=' d-none d-md-inline'>Create A Product</span>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      onClick={() => {
                        setModalShow(true);
                        setProductToDelete(product);
                      }}
                      variant='danger'
                    >
                      {' '}
                      <i className='far fa-trash-alt'></i>
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
        submit={() => deleteProductHandler(productToDelete._id)}
        message={`Are you sure you would like to delete ${productToDelete.name} from your products? this cannot be undone.`}
      />
    </>
  );
};

export default ProductListScreen;
