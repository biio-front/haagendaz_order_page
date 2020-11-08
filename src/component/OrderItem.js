import React, { Component } from "react";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    const { id, name, sort, price, picture, i } = this.props;
    this.state = {
      item_data: { id, name, sort, price, picture, i },
      total_price: this.props.i * this.props.price,
    };
  }

  increaseOrDecrease(formula, condition) {
    const { item_data } = this.state;
    const _item_data = Object.assign(item_data);
    _item_data.i = formula
    if (condition)
      return this.setState({
        item_data: _item_data,
        total_price: _item_data.i * item_data.price,
      });
  }

  render() {
    const { name, sort, price, picture, i } = this.state.item_data;
    const { total_price } = this.state;

    return (
      <li className="order_list__li">
        <input type="checkbox" name="" id="" />
        <div className="order_list__item">
          <div className="order_list__item_container">
            <img src={picture} alt={sort} />
            <div className="order_list__info">
              <div>
                <p className="order_list__name">{name}</p>
                <p className="order_list__sort">{sort}</p>
                <p className="order_list__item_price">{price.toLocaleString()}원</p>
              </div>
              <p className="order_list__count">{i}개</p>
            </div>
          </div>
          <p className="order_list__price">{total_price.toLocaleString()}원</p>
        </div>
      </li>
    );
  }
}

export default OrderItem;
