import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './routes/Home';
import OrderPage from './routes/OrderPage';
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { database } from "./firebaseApp";

function App() {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const getData = (async () => {
    const response = await database.ref('data').get();
    const result = await response.toJSON();
    setData(result);
    setIsLoaded(true);
  });
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
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
    </>
  )
}

export default App;
