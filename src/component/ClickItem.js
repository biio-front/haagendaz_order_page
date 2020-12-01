import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "store";
import "css/ClickItem.css";
import { Link } from "react-router-dom";
import addStorage from 'localStorage/addStorage';

function ClickItem({ item, addItem_Cart, addItem_Ls, onClose }) {
  const { name, sort, amount, price, picture } = item;
  const [i, setNumber] = useState(item.i || 1);
  const increase = () => setNumber(i + 1);
  const decrease = () => i > 1 ? setNumber(i - 1) : null;

  return (
    <aside className="click-item_container">
      <div className="click-item">
        <button className="click-item__close" onClick={onClose}>
          X
        </button>
        <div className="click-item__metadata">
          <img src={picture} alt={sort} className="click-item__picture" />
          <div className="click-item__description">
            <p className="click-item__name">{name}</p>
            <p className="click-item__sort">{sort}</p>
            <p className="click-item__amount">{amount}</p>
            <p className="click-item__price">{price.toLocaleString()}원</p>
            <div className="click-item__count">
              <button
                className="click-item__minus"
                onClick={decrease}
              >
                -
              </button>
              <p className="click-item__number">{i}</p>
              <button
                className="click-item__plus"
                onClick={increase}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="total-price">
          <p className="total-price__string">총 상품금액</p>
          <div className="total-price__count_price">
            <p className="total-price__count">총 수량 {i}개</p>
            <p className="total-price__price">
              {(i * price).toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="click-item__btn">
          <button
            onClick={() => {
              addItem_Cart({ ...item, i });
              addItem_Ls({ ...item, i });
              onClose();
            }}
          >
            장바구니
          </button>
          <Link to="/order"
            onClick={() => {
              addItem_Cart({ ...item, i });
              addItem_Ls({ ...item, i });
              onClose();
            }}
          >
            주문하기
          </Link>
        </div>
      </div>
    </aside>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addItem_Cart: data => dispatch(add(data)),
    addItem_Ls: data => addStorage(data)
  };
}

export default connect(null, mapDispatchToProps)(ClickItem);
