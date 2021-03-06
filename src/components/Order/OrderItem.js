import addData from "logic/addData";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "reducers/cart";
import { addCheck, removeCheck } from 'reducers/checkOrderItem';
import PropTypes from "prop-types";

function OrderItem({ item }) {
  const userId = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { id, name, sort, price, picture, i } = item;
  const [number, setNumber] = useState(i);
  // 체크 토글 버튼. 체크: state에 추가, 체크취소: state에서 제외.
  const toggleChecked = (e, id) =>
    dispatch(e.target.checked ? addCheck(id) : removeCheck(id));
  // +,- 버튼 클릭 시 상품 수량이 증가 또는 감소
  const increase_decrease = (plus_minus) => {
    setNumber(prev => prev + plus_minus);
    const _item = { ...item };
    _item.i = number + plus_minus;
    dispatch(add(_item));
    addData(_item, userId);
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

export default OrderItem;
