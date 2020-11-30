import React, { useEffect, useState } from 'react';
import RouterApp from 'component/Router'
import { database } from 'firebaseApp';

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
    <RouterApp isLoaded={isLoaded} data={data} />
  );
}

export default App;