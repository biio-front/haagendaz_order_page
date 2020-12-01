import addStorage from "localStorage/addStorage";
import React, { useState } from "react";
import { connect } from "react-redux";
import { add } from "store";

function OrderItem(props) {
  const checkedItem = (e, id) => e.target.checked ? props.onCheck(id) : props.unCheck(id);
  const { id, name, sort, price, picture, i } = props.item;
  const [number, setNumber] = useState(i);

  // +,- 버튼 클릭 시 상품 수량이 증가 또는 감소
  const increase_decrease = (plus_minus, condition) => {
    if (condition) return;
    setNumber(prev => prev + plus_minus);
    const _item = { ...props.item };
    _item.i = number + plus_minus;
    props.addItem_Cart(_item);
    props.addItem_Ls(_item);
  }

  return (
    <li className="order-list__li">
      <input
        type="checkbox"
        name="chk_delete"
        id={id}
        onClick={e => checkedItem(e, id)}
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
              <button className="order-list__minus" onClick={() => increase_decrease(-1, number === 1)}>-</button>
              <p className="order-list__number">{number}</p>
              <button className="order-list__plus" onClick={() => increase_decrease(+1)}>+</button>
            </div>
          </div>
        </div>
        <p className="order-list__price">{(price * number).toLocaleString()}원</p>
      </div>
    </li>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addItem_Cart: data => dispatch(add(data)),
    addItem_Ls: data => addStorage(data)
  };
}
export default connect(null, mapDispatchToProps)(OrderItem);
