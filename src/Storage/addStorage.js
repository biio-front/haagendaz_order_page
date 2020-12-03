import { database } from 'firebaseApp';
import { DATA_LS, NO_ITEM, parsedLS } from './initStorage';
let data_storage = [];
const addLogic = (data, ExistDataInStorage, storage) => {
  if (ExistDataInStorage) {
    // 사용자 장바구니에 기존 data가 있는 경우,
    const checkingSameItem = storage.find(item => item.id === data.id);
    if (checkingSameItem) {
      // 선택한 상품과 동일한 상품이 있을 경우, 동일한 상품의 정보만 변경.
      const indexOfSameItem = storage.indexOf(checkingSameItem);
      storage[indexOfSameItem] = data;
    } else {
      // 성택한 상품과 같은 상품이 없을 경우, data 추가.
      storage.push(data);
    }
    data_storage = storage;
  } else {
    // local storage에 아무것도 없는 경우, data 추가.
    data_storage.push(data);
  }
  return data_storage;
}
export default async function addStorage(data, userId) {
  if (userId) {
    const userRef = await database.ref(`cart/${userId}`).get();
    const userData = await userRef.toJSON();
    const userItem = Object.values(userData);
    addLogic(data, (userData !== NO_ITEM), userItem);
    await database.ref(`cart/${userId}`).set(data_storage);
  } else {
    addLogic(data, parsedLS, parsedLS);
    localStorage.setItem(DATA_LS, JSON.stringify(data_storage));
  }
};