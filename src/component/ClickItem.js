import React, { Component } from "react";
import "../css/ClickItem.css";

class ClickItem extends Component {
  constructor(props) {
    super(props);
    const { id, name, sort, amount, price, picture } = this.props.item;
    this.state = {
      item_data: { id, name, sort, amount, price, picture, i: 1 },
    };
  }

  increaseOrDecrease(formula, condition) {
    const { item_data } = this.state;
    const _item_data = Object.assign(item_data);
    _item_data.i = formula;
    if(condition) return this.setState({ item_data: _item_data });
  }
  
  render() {
    const { name, sort, amount, price, picture } = this.props.item;
    const { item_data } = this.state;
    const { i } = this.state.item_data;
    return (
      <aside className="click_item_container">
        <div className="click_item">
          <button className="click_item__close" onClick={this.props.onClose}>
            X
          </button>
          <div className="click_item__metadata">
            <img src={picture} alt={sort} className="click_item__picture" />
            <div className="click_item__description">
              <p className="click_item__name">{name}</p>
              <p className="click_item__sort">{sort}</p>
              <p className="click_item__amount">{amount}</p>
              <p className="click_item__price">{price.toLocaleString()}원</p>
              <div className="click_item__count">
                <button
                  className="click_item__minus"
                  onClick={() => {
                    this.increaseOrDecrease(i - 1, i > 1);
                  }}
                >
                  -
                </button>
                <p className="click_item__number">{i}</p>
                <button
                  className="click_item__plus"
                  onClick={() => {
                    this.increaseOrDecrease(i + 1, i > 0);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="total_price">
            <p className="total_price__string">총 상품금액</p>
            <div className="total_price__count_price">
              <p className="total_price__count">총 수량 {i}개</p>
              <p className="total_price__price">
                {(i * price).toLocaleString()}원
              </p>
            </div>
          </div>
          <div className="click_item__btn">
            <button
              onClick={() => {
                this.props.onPutItem(item_data);
                this.props.onClose();
              }}
            >
              장바구니
            </button>
            <a href='/order'
              onClick={e => {
                e.preventDefault();
                this.props.onPutItem(item_data);
                this.props.onChangePage();
                this.props.onClose();
              }}
            >
              주문하기
            </a>
          </div>
        </div>
      </aside>
    );
  }
}

export default ClickItem;
