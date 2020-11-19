import React, { useState } from "react";
import icecreamData from "../data/data.json";
import Header from "../component/Header";
import Nav from "../component/Nav";
import Items from "../component/Items";
import ClickItem from "../component/ClickItem";
import ShoppingCart from "../component/ShoppingCart";
import Footer from "../component/Footer";

function Home() {
  const [mode, setMode] = useState("pint");
  const [is_item_clicked, setIsClick] = useState(false);
  const [item_clicked, setClicked] = useState([]);

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
    <>
      <Header onHome={() => changeMode("pint")} />
      <Nav onChangePage={e => changeMenu(e)} />
      <main>
        {changeItem()}
        {is_item_clicked ? (
          <ClickItem
            item={item_clicked}
            onClose={() => closeItemPopup()}
            onChangePage={() => changeMode("order")}
          />
        ) : null}
        <ShoppingCart
          onChangePage={() => changeMode("order")}
        />
      </main>
      <Footer />
    </>
  );
}

export default Home;
