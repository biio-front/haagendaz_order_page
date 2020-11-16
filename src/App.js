import React, { useState } from "react";
import "./App.css";
import icecreamData from "./data/data.json";
import Header from "./component/Header";
import Nav from "./component/Nav";
import Items from "./component/Items";
import ClickItem from "./component/ClickItem";
import ShoppingCart from "./component/ShoppingCart";
import Order from "./component/Order";
import Footer from "./component/Footer";

function App() {
  const [mode, setMode] = useState("pint");
  const [is_item_clicked, setIsClick] = useState(false);
  const [item_clicked, setClicked] = useState([]);
  const [items_in_cart, setCart] = useState([]);

  const changeMode = changeMode => setMode(changeMode);

  // 메뉴 클릭 시 화면 바뀜.
  const changeMenu = event => {
    const selectedMenu = event.target.dataset.menu;
    if (selectedMenu !== "none") changeMode(selectedMenu);
  };

  // 아이스크림 리스트(메뉴아래 항목들)을 클릭 했을 때, 팝업창이 뜸.
  const clickItem = (data, event) => {
    const selectedItem = event.target.dataset.id;
    if (selectedItem !== "none") {
      const target = data.find(item => item.id === Number(selectedItem));
      setIsClick(true);
      setClicked(target);
    }
  };

  // 팝업 창의 x표를 누를 시, 팝업창이 사라짐.
  const closeItemPopup = () => {
    setIsClick(false);
    setClicked([]);
  };

  // 아이스크림 카트에 담기
  const clickForCart = item_data => {
    const item = item_data;
    const _items_in_cart = [...items_in_cart];
    _items_in_cart.push(item);
    setCart(_items_in_cart);
  };

  // 메뉴를 클릭 했을 때, 메뉴에 해당하는 아이스크림 리스트가 화면에 표시됨.
  const changeItem = () => {
    const data = icecreamData;

    if (mode === "pint")
      return (
        <Items data={data.pint} onClickItem={e => clickItem(data.pint, e)} />
      );
    else if (mode === "mini")
      return (
        <Items data={data.mini} onClickItem={e => clickItem(data.mini, e)} />
      );
    else if (mode === "bar")
      return (
        <Items data={data.bar} onClickItem={e => clickItem(data.bar, e)} />
      );
    else if (mode === "con")
      return (
        <Items data={data.con} onClickItem={e => clickItem(data.con, e)} />
      );
  };

  return (
    <div className="App">
      <Header onHome={() => changeMode("pint")} />
      {mode !== "order" ? <Nav onChangePage={e => changeMenu(e)} /> : null}
      {mode !== "order" ? (
        <main>
          {changeItem()}
          {is_item_clicked ? (
            <ClickItem
              item={item_clicked}
              onClose={() => closeItemPopup()}
              onPutItem={item_data => clickForCart(item_data)}
              onChangePage={() => changeMode("order")}
            />
          ) : null}
          <ShoppingCart
            items={items_in_cart}
            onChangePage={() => changeMode("order")}
          />
        </main>
      ) : (
        <Order items={items_in_cart} />
      )}
      <Footer />
    </div>
  );
}

export default App;
