import { database } from 'firebaseApp';
import { DATA_LS, NO_ITEM, parsedLS } from './initStorage';
let data_storage = [];
// local storage에서 선택된 data 제거
const deleteLogic = (data, storage) => {
  data_storage = storage.filter(item => data.indexOf(item.id) === -1);
  return data_storage;
}
export default async function deleteStorage(data, userId) {
  if (userId) {
    const userRef = await database.ref(`cart/${userId}`).get();
    const userData = await userRef.toJSON();
    const userItem = Object.values(userData);
    deleteLogic(data, userItem);
    // 장바구니의 모든 항목 삭제 시, no items으로 만들기.
    data_storage.length === 0 ?
      await database.ref(`cart/${userId}`).set(NO_ITEM)
      : await database.ref(`cart/${userId}`).set(data_storage);
  } else {
    deleteLogic(data, parsedLS);
    localStorage.setItem(DATA_LS, JSON.stringify(data_storage));
  }
}