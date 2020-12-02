import React, { useState } from "react";
import "css/Order.css";
import OrderItem from "component/OrderItem";
import { connect } from "react-redux";
import { remove } from "store";
import deleteStorage from "localStorage/deleteStorage";

function Order({ items, deleteItem_cart, deleteItem_LS }) {
  const [checked_id, setChecked_Id] = useState([]);

  // 체크한 아이템 state에 넣기
  const check = _id => {
    const _checked_id = [...checked_id];
    _checked_id.push(_id);
    setChecked_Id(_checked_id);
  };
  // 체크한 아이템 state에서 빼기
  const uncheck = _id => {
    const _checked_id = checked_id.filter(id => id !== _id);
    setChecked_Id(_checked_id);
  };

  // 모든 아이템 체크하기
  const checkAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = true);
    const _checked_id = [];
    items.forEach(item => _checked_id.push(item.id));
    setChecked_Id(_checked_id);
  }
  // 모든 아이템 체크 해제
  const unCheckAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = false);
    setChecked_Id([]);
  }
  // 모든 아이템 체크하기 토글 버튼
  const toggleCheckAll = e => {
    e.target.checked ? checkAll() : unCheckAll();
  }

  return (
    <article className="order-container">
      <h3 className="order-title">주문하기</h3>
      <div className="order-list">
        <ul className="order-list__items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <OrderItem
                key={item.id}
                item={item}
                index={index}
                onCheck={id => check(id)}
                unCheck={id => uncheck(id)}
              />
            ))
          ) : (
              <li className="order-list__none">선택된 상품이 없습니다.</li>
            )}
        </ul>
        {items.length > 0 && (
          <div className="order-list__delete">
            <input
              type="checkbox"
              onClick={e => toggleCheckAll(e)}
            />
            <button
              className="order-list__delete-btn"
              onClick={() => {
                deleteItem_cart(checked_id);
                deleteItem_LS(checked_id);
              }}
            >
              선택한 상품 삭제하기
            </button>
          </div>
        )}
      </div>
      <div className="total-order">
        <p className="total-order__total">총 주문금액</p>
        <p className="total-order__price">
          {items
            .reduce((prev, curr) => prev + curr.price * curr.i, 0)
            .toLocaleString()}
          원
        </p>
      </div>
      <a href="/pay" className="order" onClick={e => e.preventDefault()}>
        주문하기
      </a>
    </article>
  );
}

function mapStateToProps(state) {
  return { items: state };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteItem_cart: checked_id => dispatch(remove(checked_id)),
    deleteItem_LS: checked_id => deleteStorage(checked_id)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
