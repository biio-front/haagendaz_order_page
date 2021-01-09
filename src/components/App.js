import React, { useEffect, useState } from 'react';
import RouterApp from 'components/Router'
import { auth, database } from 'firebaseApp';
import { add } from 'reducers/cart';
import { useDispatch } from 'react-redux';
import { NO_ITEM, parsedLS } from 'logic/initStorage';
import { login } from 'reducers/user';

function App() {
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  // DB에서 data를 가져와 상품 리스트 구성
  const getData = (async () => {
    try {
      const response = await database.ref('data').get();
      const result = await response.toJSON();
      setData(result);
      setIsLoaded(true);
    } catch (error) {
      console.error(error);
    }
  });

  // 로그인 시, DB에서 사용자의 장바구니에 담겨있는 상품정보를 가져옴.
  const getUserItem = (async (userId) => {
    try {
      const userRef = await database.ref(`cart/${userId}`).get();
      const userData = await userRef.toJSON();
      const userItem = Object.values(userData);
      userData === NO_ITEM || userItem.map(item => dispatch(add(item)));
    } catch (error) {
      console.error(error);
    }
  });

  // 비 로그인 시, local storage에 상품이 있다면 상품정보를 가져옴.
  const getStorage = () => {
    parsedLS && parsedLS.map(item => dispatch(add(item)));
  };

  useEffect(() => {
    getData();
    try {
      auth.onAuthStateChanged(user => {
        if (user) {
          dispatch(login(user.uid));
          setUserId(user.uid);
          getUserItem(user.uid);
        } else {
          setUserId(null);
          getStorage();
        }
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RouterApp isLoaded={isLoaded} data={data} userId={userId} />
  );
}

export default App;