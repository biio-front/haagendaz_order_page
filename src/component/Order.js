import React, { Component } from "react";
import "../css/Order.css";
import OrderItem from "./OrderItem";

class Order extends Component {
  state = {
    items: this.props.items,
    checked_id: [],
  };

  // 체크한 아이템 state에 넣기
  checkForDelete(_id) {
    const { checked_id } = this.state;
    const _checked_id = Array.from(checked_id);
    _checked_id.push(_id);
    this.setState({ checked_id: _checked_id });
  }

  // 체크한 아이템 state에서 빼기
  uncheck(_id) {
    const { checked_id } = this.state;
    const _checked_id = checked_id.filter(id => id !== _id);
    this.setState({ checked_id: _checked_id });
  }

  // 체크한 아이템 삭제
  deleteItem() {
    const { items, checked_id } = this.state;
    let _items = items.filter(item => checked_id.indexOf(item.id) === -1);
    this.setState({ items: _items });
  }

  render() {
    const { items } = this.state;

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
                  onCheck={id => this.checkForDelete(id)}
                  unCheck={id => this.uncheck(id)}
                />
              ))
            ) : (
              <li className="order_list__none">선택된 상품이 없습니다.</li>
            )}
          </ul>
          {items.length > 0 ? (
            <button
              className="order_list__delete"
              onClick={() => this.deleteItem()}
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
}

export default Order;
