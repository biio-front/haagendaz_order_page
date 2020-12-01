import React from "react";
import "css/ShoppingCart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ShoppingCart({ onClickItem, items, onChangePage }) {
  return (
    <aside className="shoppingcart">
      <ul className="shoppingcart__items"
        onClick={e => {
          onClickItem(items, e);
        }}
      >
        {items.length > 0 ? (
          items.map(item => (
            <li className="shoppingcart__item" key={item.id}>
              <img src={item.picture} alt={item.sort} className="shoppingcart__img" data-id={item.id} />
              <div className="shoppingcart__count">{item.i}</div>
            </li>
          ))
        ) : (
            <li></li>
          )}
      </ul>
      <Link to="/order" className="shoppingcart__order" onClick={onChangePage}>
        주문하기
      </Link>
    </aside>
  );
}

function mapStateToProps(state) {
  return { items: state };
}

export default connect(mapStateToProps)(ShoppingCart);
