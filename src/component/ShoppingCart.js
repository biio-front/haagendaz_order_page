import React from "react";
import "css/ShoppingCart.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ShoppingCart({ items, onChangePage }) {
  return (
    <aside className="shopping_cart">
      <ul className="shopping_cart__items">
        {items.length > 0 ? (
          items.map(item => (
            <li className="shopping_cart__item" key={item.picture}>
              <img src={item.picture} alt={item.sort} />
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
