import React, { useEffect, useState } from 'react';
import RouterApp from 'component/Router'
import { database } from 'firebaseApp';
import { add } from 'store';
import { connect } from 'react-redux';
import { parsedLS } from 'localStorage/initStorage';

function App({ addItem_Cart }) {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  // DB에서 data를 가져와 상품 리스트 구성
  const getData = (async () => {
    const response = await database.ref('data').get();
    const result = await response.toJSON();
    setData(result);
    setIsLoaded(true);
  });
  // local storage에 상품이 있다면 상품정보를 가져옴.
  const getStorage = () => {
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