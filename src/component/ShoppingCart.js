import React from "react";
import '../css/ShoppingCart.css';

function ShoppingCart(props) {
    const { items } = props;
    return (
      <aside className="shopping_cart">
        <ul className="shopping_cart__items">
          {items.length > 0 ? (
            items.map(item => (
              <li className="shopping_cart__item" key={item.picture}>
                <img src={item.picture}  alt={item.sort}/>
              </li>
            ))
          ) : (
            <li>
            </li>
          )}
        </ul>
        <a
          href="/order"
          className="shopping_cart__order"
          onClick={e => {
            e.preventDefault();
            props.onChangePage();
          }}
        >
          주문하기
        </a>
      </aside>
    );
}

export default ShoppingCart;
