import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import Order from "routes/Order";
import Header from "component/Header";
import Auth from "routes/Auth";
import Footer from "component/Footer";
import "css/App.css";
import "css/loader.css";

function RouterApp({ isLoaded, data, userId }) {
  return (
    <Router>
      <Header userId={userId} />
      {isLoaded ?
        <>
          <Switch>
            {userId || <Route path="/auth"><Auth userId={userId} /></Route>}
            <Route path="/order"><Order userId={userId} /></Route>
            <Route path="/"><Home data={data} userId={userId} /></Route>
          </Switch>
          <Redirect from='*' to='/' />
        </>
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
