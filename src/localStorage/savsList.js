export default function saveList(DATA_LS, data_ls) {
  localStorage.setItem(DATA_LS, JSON.stringify(data_ls));
};