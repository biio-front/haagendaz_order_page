import React from "react";
import "css/Order.css";
import OrderItem from "component/OrderItem";
import { connect } from "react-redux";
import DeleteCheck from "component/DeleteCheck";

function Order({ items }) {
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
              />
            ))
          ) : (
              <li className="order-list__none">선택된 상품이 없습니다.</li>
            )}
        </ul>
        <DeleteCheck />
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
  return { items: state.cart };
}

export default connect(mapStateToProps)(Order);
