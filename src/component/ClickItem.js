import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "../store";
import "../css/ClickItem.css";
import { Link } from "react-router-dom";

function ClickItem(props) {
  const { item, addItem_Cart } = props;
  const { name, sort, amount, price, picture } = item;
  const [i, setNumber] = useState(1);
  const increaseOrDecrease = formula => {
    const _i = formula;
    setNumber(formula);
  };

  return (
    <aside className="click_item_container">
      <div className="click_item">
        <button className="click_item__close" onClick={props.onClose}>
          X
        </button>
        <div className="click_item__metadata">
          <img src={picture} alt={sort} className="click_item__picture" />
          <div className="click_item__description">
            <p className="click_item__name">{name}</p>
            <p className="click_item__sort">{sort}</p>
            <p className="click_item__amount">{amount}</p>
            <p className="click_item__price">{price.toLocaleString()}원</p>
            <div className="click_item__count">
              <button
                className="click_item__minus"
                onClick={() => {
                  if (i > 1) increaseOrDecrease(i - 1);
                }}
              >
                -
              </button>
              <p className="click_item__number">{i}</p>
              <button
                className="click_item__plus"
                onClick={() => {
                  increaseOrDecrease(i + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="total_price">
          <p className="total_price__string">총 상품금액</p>
          <div className="total_price__count_price">
            <p className="total_price__count">총 수량 {i}개</p>
            <p className="total_price__price">
              {(i * price).toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="click_item__btn">
          <button
            onClick={() => {
              addItem_Cart({ ...item, i: i });
              props.onClose();
            }}
          >
            장바구니
          </button>
          <Link to="/order">
            <button
              onClick={() => {
                addItem_Cart({ ...item, i: i });
                props.onChangePage();
                props.onClose();
              }}
            >
              주문하기
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addItem_Cart: data => dispatch(add(data)),
  };
}

export default connect(null, mapDispatchToProps)(ClickItem);
