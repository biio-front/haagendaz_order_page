// local storage를 변경할 때 사용되는 기본 값
export const DATA_LS = 'icecream';
const loadedLS = localStorage.getItem(DATA_LS);
export const parsedLS = JSON.parse(loadedLS);