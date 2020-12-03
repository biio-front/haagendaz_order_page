// local storage를 변경할 때 사용되는 기본 값
export const DATA_LS = 'icecream';
const loadedLS = localStorage.getItem(DATA_LS);
export const parsedLS = JSON.parse(loadedLS);

// DB에 사용자의 장바구니가 비었을 때 들어갈 값
export const NO_ITEM = 'no items';