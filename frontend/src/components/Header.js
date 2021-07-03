import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Header = () => {
  const cartDetail = useSelector((state) => state.cartDetail);
  const { cartProducts } = cartDetail;

  const authDetail = useSelector((state) => state.authDetail);
  const { loading, user } = authDetail;

  const dispatch = useDispatch();

  let totalCartItems = 0;

  cartProducts.map((item) => {
    totalCartItems = totalCartItems + item.qty;
    return totalCartItems;
  });

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SHOPPY</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  {' '}
                  <i className='fas fa-shopping-cart'></i> CART
                  {cartProducts.length > 0 ? (
                    <span className='badge'>{totalCartItems}</span>
                  ) : null}
                </Nav.Link>
              </LinkContainer>

              {!loading && user ? (
                <NavDropdown title={user.name}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
