import React from "react";
import "css/ShoppingCart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ShoppingCart({ onClickItem, items, onChangePage }) {
  return (
    <aside className="shopping_cart">
      <ul className="shopping_cart__items"
        onClick={e => {
          onClickItem(items, e);
        }}
      >
        {items.length > 0 ? (
          items.map(item => (
            <li className="shopping_cart__item" key={item.picture}>
              <img src={item.picture} alt={item.sort} className="shopping_cart__img" data-id={item.id} />
              <div className="shoppingcart__count">{item.i}</div>
            </li>
          ))
        ) : (
            <li></li>
          )}
      </ul>
      <Link to="/order" className="shopping_cart__order" onClick={onChangePage}>
        주문하기
      </Link>
    </aside>
  );
}

function mapStateToProps(state) {
  return { items: state };
}

export default connect(mapStateToProps)(ShoppingCart);
