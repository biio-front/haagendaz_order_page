import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import OrderPage from 'routes/OrderPage';
import Header from "component/Header";
import Footer from "component/Footer";
import "css/App.css";
import "css/loader.css";

function RouterApp({ isLoaded, data }) {
  return (
    <Router>
      <Header />
      {isLoaded ?
        <Switch>
          <Route path="/order" component={OrderPage}></Route>
          <Route path="/"><Home data={data} /></Route>
        </Switch>
        : <Route path="/">
          <article className="loader-container">
            <div className="loader"></div>
          </article>
        </Route>
      }
      <Footer />
    </Router>
  );
}

export default RouterApp;
