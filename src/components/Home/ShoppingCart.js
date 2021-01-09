import React, { useCallback } from "react";
import "css/ShoppingCart.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ShoppingCart({ onClickItem }) {
  const items = useSelector(state => state.cart);
  const onClick = useCallback(e => onClickItem(items, e), [items, onClickItem]);
  return (
    <aside className="shoppingcart">
      <ul className="shoppingcart__items"
        onClick={onClick}
      >
        {items.length > 0 && (
          items.map(item => (
            <li className="shoppingcart__item" key={item.id}>
              <img
                src={item.picture}
                alt={item.sort}
                className="shoppingcart__img"
                data-id={item.id}
              />
              <div className="shoppingcart__count">{item.i}</div>
            </li>
          ))
        )}
      </ul>
      <Link to="/order" className="shoppingcart__order">
        주문하기
      </Link>
    </aside>
  );
}

export default ShoppingCart;
