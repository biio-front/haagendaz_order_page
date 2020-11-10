import React from "react";
import "../css/Order.css";
import OrderItem from "./OrderItem";

function Order(props) {
  const { items } = props;
  return (
    <section className="order_container">
      <h3 className="order_title">주문하기</h3>
      <article className="order_list">
        <ul className="order_list__items">
          {items.length > 0 ? (
            items.map(item => (
              <OrderItem
                key={item.id}
                id={item.id}
                name={item.name}
                sort={item.sort}
                price={item.price}
                picture={item.picture}
                i={item.i}
              />
            ))
          ) : (
            <li className="order_list__none">선택된 상품이 없습니다.</li>
          )}
        </ul>
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

export default Order;
