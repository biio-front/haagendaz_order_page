import React from "react";

function OrderItem(props) {
  const checkedItem = (e, id) => e.target.checked ? props.onCheck(id) : props.unCheck(id);
  const { id, name, sort, price, picture, i } = props;

  return (
    <li className="order_list__li">
      <input
        type="checkbox"
        name="chk_delete"
        id={id}
        onClick={e => checkedItem(e, id)}
      />
      <div className="order_list__item">
        <div className="order_list__item_container">
          <img src={picture} alt={sort} />
          <div className="order_list__info">
            <div>
              <p className="order_list__name">{name}</p>
              <p className="order_list__sort">{sort}</p>
              <p className="order_list__item_price">
                {price.toLocaleString()}원
              </p>
            </div>
            <p className="order_list__count">{i}개</p>
          </div>
        </div>
        <p className="order_list__price">{(price * i).toLocaleString()}원</p>
      </div>
    </li>
  );

}

export default OrderItem;
