import React, { useState } from "react";
import Nav from "component/Nav";
import IcecreamList from "component/IcecreamList";
import ClickItem from "component/ClickItem";
import ShoppingCart from "component/ShoppingCart";
import { connect } from "react-redux";

function Home({ data, items }) {
  const [isItemClicked, setIsItemClicked] = useState(false);
  const [itemClicked, setItemClicked] = useState([]);

  // 아이스크림 리스트(메뉴아래 항목들)을 클릭 했을 때, 팝업창이 뜸.
  const clickItem = (data, e) => {
    const selectedItem = Number(e.target.dataset.id);
    if (selectedItem) {
      const checkingSameItem = items.find(item => item.id === selectedItem);
      if (checkingSameItem) {
        setIsItemClicked(true);
        setItemClicked(checkingSameItem);
      } else {
        const target = data.find(item => item.id === selectedItem);
        setIsItemClicked(true);
        setItemClicked(target);
      }
    };
  }

  // 팝업 창의 x표를 누를 시, 팝업창이 사라짐.
  const closeItemPopup = () => {
    setIsItemClicked(false);
    setItemClicked([]);
  };

  return (
    <>
      <Nav />
      <IcecreamList data={data} onClickItem={(data, e) => clickItem(data, e)} />
      {isItemClicked ? (
        <ClickItem
          item={itemClicked}
          onClose={() => closeItemPopup()}
        />
      ) : null}
      <ShoppingCart onClickItem={(data, e) => clickItem(data, e)} />
    </>
  );
}

function mapStateToProps(state) {
  return { items: state };
}

export default connect(mapStateToProps)(Home);
