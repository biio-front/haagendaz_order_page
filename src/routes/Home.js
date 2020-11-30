import React, { useState } from "react";
import Nav from "component/Nav";
import IcecreamList from "component/IcecreamList";
import ClickItem from "component/ClickItem";
import ShoppingCart from "component/ShoppingCart";

function Home({ data }) {
  const [is_item_clicked, setIsClick] = useState(false);
  const [item_clicked, setClicked] = useState([]);

  // 아이스크림 리스트(메뉴아래 항목들)을 클릭 했을 때, 팝업창이 뜸.
  const clickItem = (data, e) => {
    const selectedItem = e.target.dataset.id;
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
      <IcecreamList data={data} onClickItem={(data, e) => clickItem(data, e)} />
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
