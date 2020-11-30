import React, { useState } from "react";
import "css/Order.css";
import OrderItem from "component/OrderItem";
import { connect } from "react-redux";
import { remove } from "store";

function Order({ items, deleteItem_cart }) {
  const [checked_id, setCheId] = useState([]);

  // 체크한 아이템 state에 넣기
  const checkForDelete = _id => {
    const _checked_id = [...checked_id];
    _checked_id.push(_id);
    setCheId(_checked_id);
  };

  // 체크한 아이템 state에서 빼기
  const uncheck = _id => {
    const _checked_id = checked_id.filter(id => id !== _id);
    setCheId(_checked_id);
  };

  return (
    <section className="order_container">
      <h3 className="order_title">주문하기</h3>
      <article className="order_list">
        <ul className="order_list__items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <OrderItem
                key={item.id}
                item={item}
                index={index}
                onCheck={id => checkForDelete(id)}
                unCheck={id => uncheck(id)}
              />
            ))
          ) : (
              <li className="order_list__none">선택된 상품이 없습니다.</li>
            )}
        </ul>
        {items.length > 0 ? (
          <button
            className="order_list__delete"
            onClick={() => deleteItem_cart(checked_id)}
          >
            선택한 상품 삭제하기
          </button>
        ) : null}
      </article>
      <div className="total_order">
        <p className="total_order__total">총 주문금액</p>
        <p className="total_order__price">
          {items
            .reduce((prev, curr) => prev + curr.price * curr.i, 0)
            .toLocaleString()}
          원
        </p>
      </div>
      <a href="/pay" className="order" onClick={e => e.preventDefault()}>
        주문하기
      </a>
    </section>
  );
}

function mapStateToProps(state) {
  return { items: state };
}
function mapDispatchToProps(dispatch) {
  return { deleteItem_cart: checked_id => dispatch(remove(checked_id)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
