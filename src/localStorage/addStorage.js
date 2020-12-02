import { DATA_LS, parsedLS } from './initStorage';

export default function addStorage(data) {
  let data_ls = [];
  if (parsedLS) {
    // local storage에 data가 있는 경우,
    data_ls = [];
    const checkingSameItem = parsedLS.find(item => item.id === data.id);
    if (checkingSameItem) {
      // 선택한 상품과 동일한 상품이 있을 경우, 동일한 상품의 정보만 변경.
      const indexOfSameItem = parsedLS.indexOf(checkingSameItem);
      parsedLS[indexOfSameItem] = data;
    } else {
      // 성택한 상품과 같은 상품이 없을 경우, data 추가.
      parsedLS.push(data);
    }
    data_ls = parsedLS;
  } else {
    // local storage에 아무것도 없는 경우, data 추가.
    data_ls.push(data);
  }
  localStorage.setItem(DATA_LS, JSON.stringify(data_ls));
};