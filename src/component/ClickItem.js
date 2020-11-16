import React, { useState } from "react";
import "../css/ClickItem.css";

function ClickItem(props) {
  const { item } = props;
  const { name, sort, amount, price, picture } = props.item;
  const [item_data, setData] = useState({ ...item, i: 1 });
  const { i } = item_data;

  const increaseOrDecrease = formula => {
    const _item_data = { ...item_data };
    _item_data.i = formula;
    setData(_item_data);
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
              props.onPutItem(item_data);
              props.onClose();
            }}
          >
            장바구니
          </button>
          <a
            href="/order"
            onClick={e => {
              e.preventDefault();
              props.onPutItem(item_data);
              props.onChangePage();
              props.onClose();
            }}
          >
            주문하기
          </a>
        </div>
      </div>
    </aside>
  );
}

export default ClickItem;
