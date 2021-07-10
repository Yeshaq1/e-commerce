import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const cartDetail = useSelector((state) => state.cartDetail);
  const { cartProducts } = cartDetail;

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <FormContainer>
        <CheckoutSteps step1 />
      </FormContainer>
      <Col lg={8}>
        <h1>Shopping Cart</h1>
        {cartProducts.length === 0 ? (
          <Message>
            Your cart is empty
            <Link style={{ margin: '10px' }} to='/'>
              Back To Shop
            </Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartProducts.map((product) => (
              <ListGroup.Item className='p-4' key={product._id}>
                <Row>
                  <Col lg={2}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col lg={3}>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </Col>
                  <Col lg={2}>${product.price}</Col>
                  <Col lg={3} xs={10}>
                    <Form.Control
                      as='select'
                      className='form-select'
                      value={product.qty}
                      onChange={(e) =>
                        dispatch(addToCart(product._id, Number(e.target.value)))
                      }
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col lg={2} xs={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => dispatch(removeFromCart(product._id))}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col lg={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartProducts.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              $
              {cartProducts
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className='col-12'
                type='button'
                disabled={cartProducts.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
