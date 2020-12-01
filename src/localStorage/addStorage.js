import saveList from 'localStorage/savsList';

export default function addStorage(data) {
  const DATA_LS = 'icecream';
  const loadedLS = localStorage.getItem(DATA_LS);
  const parsedLS = JSON.parse(loadedLS);
  let data_ls = [];
  if (parsedLS) {
    const checkingSameItem = parsedLS.find(item => item.id === data.id);
    if (checkingSameItem) {
      const indexOfSameItem = parsedLS.indexOf(checkingSameItem);
      parsedLS[indexOfSameItem] = data;
    } else {
      parsedLS.push(data);
    }
    data_ls = parsedLS;
  } else {
    data_ls.push(data);
  }
  saveList(DATA_LS, data_ls);
};