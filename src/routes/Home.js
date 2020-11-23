import React, { useState } from "react";
import data from "../data/data.json";
import Nav from "../component/Nav";
import Items from "../component/Items";
import ClickItem from "../component/ClickItem";
import ShoppingCart from "../component/ShoppingCart";
import { HashRouter as Route, Switch } from "react-router-dom";

function Home() {
  const [is_item_clicked, setIsClick] = useState(false);
  const [item_clicked, setClicked] = useState([]);

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

  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Items data={data.pint} onClickItem={e => clickItem(data.pint, e)} />
        </Route>
        <Route path='/mini'>
          <Items data={data.mini} onClickItem={e => clickItem(data.mini, e)} />
        </Route>
        <Route path='/bar'>
          <Items data={data.bar} onClickItem={e => clickItem(data.bar, e)} />
        </Route>
        <Route path='/con'>
          <Items data={data.con} onClickItem={e => clickItem(data.con, e)} />
        </Route>
      </Switch>
      {is_item_clicked ? (
        <ClickItem
          item={item_clicked}
          onClose={() => closeItemPopup()}
        />
      ) : null}
      <ShoppingCart />
    </>
  );
}

export default Home;
