import React, { useEffect, useState } from 'react';
import RouterApp from 'component/Router'
import { auth, database } from 'firebaseApp';
import { add } from 'reducers/cart';
import { connect } from 'react-redux';
import { NO_ITEM, parsedLS } from 'Storage/initStorage';

function App({ addItem_Cart }) {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  // DB에서 data를 가져와 상품 리스트 구성
  const getData = (async () => {
    const response = await database.ref('data').get();
    const result = await response.toJSON();
    setData(result);
    setIsLoaded(true);
  });

  // 로그인 시, DB에서 사용자의 장바구니에 담겨있는 상품정보를 가져옴.
  const getUserItem = (async (userId) => {
    const userRef = await database.ref(`cart/${userId}`).get();
    const userData = await userRef.toJSON();
    const userItem = Object.values(userData);
    userData === NO_ITEM || userItem.map(item => addItem_Cart(item));
  });

  // 비 로그인 시, local storage에 상품이 있다면 상품정보를 가져옴.
  const getStorage = () => {
    if (parsedLS) {
      parsedLS.map(item => addItem_Cart(item));
    }
  };
  useEffect(() => {
    getData();
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
        getUserItem(user.uid);
      } else {
        setUserId(null);
        getStorage();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RouterApp isLoaded={isLoaded} data={data} userId={userId} />
  );
}
function mapDispatchToProps(dispatch) {
  return {
    addItem_Cart: data => dispatch(add(data))
  };
}
export default connect(null, mapDispatchToProps)(App);