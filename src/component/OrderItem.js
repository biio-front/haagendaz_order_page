import addStorage from "Storage/addStorage";
import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "store";
import PropTypes from "prop-types";

function OrderItem({ item, onCheck, unCheck, addItem_Cart, addItem_Ls }) {
  const { id, name, sort, price, picture, i } = item;
  const [number, setNumber] = useState(i);
  // 체크 토글 버튼. 체크: state에 추가, 체크취소: state에서 제외.
  const toggleChecked = (e, id) =>
    e.target.checked ? onCheck(id) : unCheck(id);
  // +,- 버튼 클릭 시 상품 수량이 증가 또는 감소
  const increase_decrease = (plus_minus) => {
    setNumber(prev => prev + plus_minus);
    const _item = { ...item };
    _item.i = number + plus_minus;
    addItem_Cart(_item);
    addItem_Ls(_item);
  }
  return (
    <li className="order-list__li">
      <input
        type="checkbox"
        name="chk_delete"
        id={id}
        onClick={e => toggleChecked(e, id)}
      />
      <div className="order-list__item">
        <div className="order-list__item-container">
          <img src={picture} alt={sort} />
          <div className="order-list__info">
            <div>
              <p className="order-list__name">{name}</p>
              <p className="order-list__sort">{sort}</p>
              <p className="order-list__item-price">
                {price.toLocaleString()}원
              </p>
            </div>
            <div className="order-list__count">
              <button
                className="order-list__minus"
                onClick={() => number > 1 && increase_decrease(-1)}
              >
                -
              </button>
              <p className="order-list__number">{number}</p>
              <button
                className="order-list__plus"
                onClick={() => increase_decrease(+1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <p className="order-list__price">
          {(price * number).toLocaleString()}원
        </p>
      </div>
    </li>
  );
}
OrderItem.prototype = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired
};

function mapDispatchToProps(dispatch, ownProps) {
  const { userId } = ownProps;
  return {
    addItem_Cart: data => dispatch(add(data)),
    addItem_Ls: data => addStorage(data, userId)
  };
}
export default connect(null, mapDispatchToProps)(OrderItem);
