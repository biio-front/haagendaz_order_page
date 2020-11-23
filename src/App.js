import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import OrderPage from './routes/OrderPage';
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";

function App() {
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

export default App;
