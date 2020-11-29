import React from 'react';
import { HashRouter as Route, Router, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import OrderPage from '../routes/OrderPage';
import Footer from './Footer';
import Header from './Header';

function RouterApp() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path="/order" component={OrderPage}></Route>
          <Route path="/" component={Home}></Route>
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default RouterApp;

