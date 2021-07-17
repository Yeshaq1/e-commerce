import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import orderConfirmationScreen from './screens/OrderConfirmationScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <PrivateRoute path='/shipping' component={ShippingScreen} />
          <PrivateRoute path='/payment' component={PaymentScreen} />
          <PrivateRoute path='/placeorder' component={PlaceOrderScreen} />
          <PrivateRoute path='/order/:id' component={orderConfirmationScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
