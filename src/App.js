import React from "react";
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from './routes/Home';
import OrderPage from './routes/OrderPage';
import "./App.css";

function App() {
  return (
      <Router>
          <Route path="/" exact component={Home}></Route>
          <Route path="/order" component={OrderPage}></Route>
      </Router>
  )
}

export default App;
