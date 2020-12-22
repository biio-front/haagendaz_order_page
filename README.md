# [하겐다즈 주문페이지](https://biio-front.github.io/haagendaz_order_page/)
React를 사용하여 만든 SPA입니다.  
아이스크림을 장바구니에 담고, 주문하기 클릭 시 주문화면으로 넘어갑니다. 

## 주요 기술
React, Redux, Firebase

## 주요 기능
Firebase의 DB를 사용하여 동적인 작업들을 수행했습니다.

### 계정만들기/로그인/로그아웃
```js
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [newAccount, setNewAccount] = useState(false);
const onChange = (e) => {
  const { type, value } = e.target
  switch (type) {
    case 'email':
      return setEmail(value);
    case 'password':
      return setPassword(value);
    default: break;
  }
}
const onSubmit = async e => {
  e.preventDefault();
  try {
    if (newAccount) {
      const newUser = await auth.createUserWithEmailAndPassword(email, password);
      const newUserId = await newUser.user.uid;
      database.ref(`cart/${newUserId}`).set(NO_ITEM);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
  } catch (error) {
    setError(error.message);
  }
}
```
이메일과 비밀번호를 입력하여 계정을 만들어 로그인할 수 있습니다. 입력한 정보는 DB에 저장됩니다.  

### 장바구니
```js
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
    // 기존 장바구니에 아무것도 없는 경우, data 추가.
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
```
- 로그인 계정 장바구니  
장바구니에 들어간 상품정보는 실시간으로 DB에 저장됩니다. 같은 계정으로 로그인 시 동일한 장바구니를 볼 수 있습니다.
- 비로그인 계정 장바구니  
local storage를 사용하여 로그인 하지 않을 경우 브라우저에 장바구니를 저장합니다. 추후 웹페이지 방문시 동일한 장바구니로 쇼핑할 수 있습니다. 로그인 시 local storage에 담긴 정보는 사라집니다.  
    

## 화면 구현
### 반응형  
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfMTY5/MDAxNjA4NjAxMTIzOTA1.mm1PGtlgn1MClx1qWwpasDZrHRKSVhDldyVgSJ_iW_Ug.kvhR1ADR-ztco7DbnwJa6SMgC7Wiqd4DGtgNqEq_91Mg.JPEG.bohwajung/Worksace-Mockup.jpg?type=w966" widh=800>  
  
Mobile, Tablet, PC등 화면 넓이에 맞게 화면의 구성이 변합니다.
  
### 로딩 페이지
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfMjMy/MDAxNjA4NjAyNTQ4NzA1.7jGQF4dggqFNjPFjxrMfMHK9yU9bROJRZDZa4Ko0V-Ug.TUgxTuqoadHvnnnX1wvtTXZJ9V-9lts1wW5zagwBQLsg.JPEG.bohwajung/8_loading.JPG?type=w966" width=350>
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfMTQw/MDAxNjA4NjAyNTQ4Nzcz.5f0U752NZXAfOW_qXgzW2_HoeLdjWWc1pgvms5htO3og.ThKCNh36O9PehFnQeJCMIpZHKAjM4_leBnC-q3LNF08g.JPEG.bohwajung/9.JPG?type=w966" width=350>  
  
DB에서 정보를 불러오기 전 까지 동그라미 세개가 합쳐졌다가 원래 자리로 돌아가는 것을 반복하는 로딩페이지가 뜹니다.  


### 로그인 페이지  
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfNCAg/MDAxNjA4NjAxODQzNDY4.VqTo-ablaI4kma7lxH8uWJZQp-Bpi2Q4yOGqsjpRGQgg.cAaYSGE_C24vblz6yaXVMbQbb4LDAjSKC-x-lUkNiXUg.JPEG.bohwajung/4_login.JPG?type=w966" width=350>
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfNzEg/MDAxNjA4NjAxODQzNjE3.PTnnTiCoafsiOq7sS40trm-IQPsA4K_ttVKbN8gv9_Mg.HDdt_Pm-19P69rFcvzkF0Va911o1nflBTLUY8Rtz3gIg.JPEG.bohwajung/5_new_account.JPG?type=w966" width=350>
  
오른쪽 상단 Login 클릭 시 로그인 페이지로 이동합니다.  
새 계정만드기 클릭 시, 계정을 만드는 페이지로 이동합니다.  
로그인 후에는 오른쪽 상단의 글자가 LogOut으로 바뀝니다.  
  
### 모달창
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfMjc0/MDAxNjA4NjAxODQzOTA1.nfLojcB9LUeF2bOLmKYMdOCHowfrudH6E1BS7G7IxnEg.S_epbQcDQUHefCA_QqksKXxG46FbfEBrp5rmbZhzEUcg.JPEG.bohwajung/6_popup.JPG?type=w966" width=350>  
  
  메인화면의 상품이나 하단 장바구니에 들어간 상품 클릭 시, 상품을 장바구니에 담을 수 있는 모달창이 뜹니다. 여기서 새로운 상품을 담거나 상품의 갯수를 변경할 수 있습니다.
  
### 상품 주문페이지
<img src="https://postfiles.pstatic.net/MjAyMDEyMjJfMjAw/MDAxNjA4NjAxODQzMjgz.skjXlFj515P9_4sdzBX91kFIVsnx7I_CxZchBKOs1DYg.PJ9EEcAJfUXR33u44nHNO47ziXZ7252LdA9QC4zf8lcg.JPEG.bohwajung/7_cart.JPG?type=w966" width=350>  
  
  주문하기 클릭 시 주문 최종 확인 창으로 이동합니다. 여기서 상품의 갯수를 바꾸거나 삭제할 수 있습니다.
