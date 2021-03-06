import React from "react";
import PropTypes from "prop-types";

function Item({ id, name, sort, price, picture }) {
  return (
    <li className="item">
      <img src={picture} alt={sort} className="item__picture" data-id={id} />
      <p className="item__name">{name}</p>
      <p className="item__price">{price.toLocaleString()}원</p>
    </li>
  );
}

Item.prototype = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired
};

export default Item;