import React, { Fragment, useEffect, useState } from 'react';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import axios from 'axios';

const ProductEditScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

  const authDetail = useSelector((state) => state.authDetail);
  const { user } = authDetail;

  const [productEdit, updateEditProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: 0,
    image: '',
    category: '',
    countInStock: 0,
    id: '',
  });

  const { name, description, brand, price, image, category, countInStock } =
    productEdit;

  useEffect(() => {
    if (user.isAdmin) {
      if (success) {
        dispatch(getProductById(match.params.id));
        dispatch({ type: PRODUCT_UPDATE_RESET });
      } else {
        if (!product.name || product._id !== match.params.id) {
          dispatch(getProductById(match.params.id));
        } else {
          updateEditProduct({
            name: product.name,
            description: product.description,
            brand: product.brand,
            price: product.price,
            image: product.image,
            category: product.category,
            countInStock: product.countInStock,
            id: product._id,
          });
        }
      }
    } else {
      history.push('/');
    }
  }, [match.params.id, dispatch, product, user.isAdmin, success, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateEditProduct((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productEdit));
  };

  // onChange Handler for Image Upload
  const uploadFilehandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      updateEditProduct((preValue) => {
        return {
          ...preValue,
          image: data,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger' children={error} />
      ) : (
        <>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message>{errorUpdate}</Message>}
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Button
                  onClick={() => history.goBack()}
                  className='btn btn-light my-3'
                >
                  Go Back
                </Button>
              </Col>
            </Row>

            <Row>
              <Col lg={4}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col lg={8}>
                <ListGroup>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Name</strong>
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        name='name'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Price</strong>
                      </Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Name'
                        value={price}
                        name='price'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Description</strong>
                      </Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Enter Name'
                        value={description}
                        name='description'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Category</strong>
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={category}
                        name='category'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Brand</strong>
                      </Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Brand'
                        value={brand}
                        name='brand'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        name='image'
                        onChange={handleChange}
                      ></Form.Control>

                      <input
                        className='form-control'
                        type='file'
                        id='formFile'
                        onChange={uploadFilehandler}
                      ></input>
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form.Group>
                      <Form.Label>
                        <strong>Count In Stock</strong>
                      </Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Count In Stock'
                        value={countInStock}
                        name='countInStock'
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button variant='primary' type='submit'>
                      Save Changes
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Fragment>
  );
};

export default ProductEditScreen;
