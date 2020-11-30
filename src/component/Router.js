import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import OrderPage from 'routes/OrderPage';
import "css/App.css";
import Header from "component/Header";
import Footer from "component/Footer";

function RouterApp({ isLoaded, data }) {
  return (
    <Router>
      <Header />
      {isLoaded ?
        <Switch>
          <Route path="/order" component={OrderPage}></Route>
          <Route path="/"><Home data={data} /></Route>
        </Switch>
        : <Route path="/"><span>Loading...</span></Route>
      }
      <Footer />
    </Router>
  );
}

export default RouterApp;
