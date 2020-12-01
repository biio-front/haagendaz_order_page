import saveList from 'localStorage/savsList';

const deleteStorage = (data) => {
  const DATA_LS = 'icecream';
  const loadedLS = localStorage.getItem(DATA_LS);
  const parsedLS = JSON.parse(loadedLS);
  let data_ls = [];
  data_ls = parsedLS.filter(item => data.indexOf(item.id) === -1);
  saveList(DATA_LS, data_ls);
}

export default deleteStorage;