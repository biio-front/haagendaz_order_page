import React, { useEffect, useState } from 'react';
import RouterApp from 'component/Router'
import { database } from 'firebaseApp';
import { add } from 'store';
import { connect } from 'react-redux';

function App({ addItem_Cart }) {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const getData = (async () => {
    const response = await database.ref('data').get();
    const result = await response.toJSON();
    setData(result);
    setIsLoaded(true);
  });
  const getStorage = () => {
    const DATA_LS = 'icecream';
    const loadedLS = localStorage.getItem(DATA_LS);
    const parsedLS = JSON.parse(loadedLS);
    if (parsedLS) {
      parsedLS.map(item => addItem_Cart(item));
    }
  };
  useEffect(() => {
    getData();
    getStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RouterApp isLoaded={isLoaded} data={data} />
  );
}
function mapDispatchToProps(dispatch) {
  return {
    addItem_Cart: data => dispatch(add(data))
  };
}
export default connect(null, mapDispatchToProps)(App);