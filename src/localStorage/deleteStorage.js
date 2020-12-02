import { DATA_LS, parsedLS } from './initStorage';

// local storage에서 선택된 data 제거
export default function deleteStorage(data) {
  let data_ls = [];
  data_ls = parsedLS.filter(item => data.indexOf(item.id) === -1);
  localStorage.setItem(DATA_LS, JSON.stringify(data_ls));
}