import React, { useState } from "react";
import Nav from "components/Nav";
import IcecreamList from "components/Home/IcecreamList";
import ClickItem from "components/Home/ClickItem";
import ShoppingCart from "components/Home/ShoppingCart";
import { connect } from "react-redux";

function Home({ data, items, userId }) {
  const [isItemClicked, setIsItemClicked] = useState(false);
  const [itemClicked, setItemClicked] = useState([]);

  // 아이스크림을 클릭 했을 때, 팝업창이 뜸.
  const clickItem = (data, e) => {
    const selectedItem = Number(e.target.dataset.id);
    if (selectedItem) {
      const checkingSameItem = items.find(item => item.id === selectedItem);
      if (checkingSameItem) {
        // 이미 선택된 상품을 클릭 시, 선택했던 상품 정보가 팝업창으로 뜸.
        setIsItemClicked(true);
        setItemClicked(checkingSameItem);
      } else {
        // 새로운 상품 클릭 시, 그 상품정보의 팝업창 뜸.
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
          userId={userId}
          item={itemClicked}
          onClose={() => closeItemPopup()}
        />
      ) : null}
      <ShoppingCart onClickItem={(data, e) => clickItem(data, e)} />
    </>
  );
}

function mapStateToProps(state) {
  return { items: state.cart };
}

export default connect(mapStateToProps)(Home);
