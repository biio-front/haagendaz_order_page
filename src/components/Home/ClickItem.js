import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "reducers/cart";
import "css/ClickItem.css";
import { Link } from "react-router-dom";
import addData from 'logic/addData';

function ClickItem({ item, onClose }) {
  const userId = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { name, sort, amount, price, picture } = item;
  const [i, setNumber] = useState(item.i || 1);
  const increase = () => setNumber(i + 1);
  const decrease = () => i > 1 && setNumber(i - 1);

  const onClick = useCallback(async () => {
    const data = { ...item, i }
    const result = await addData(data, userId);
    console.log(result);
    dispatch(add(result));
    onClose();
  }, [dispatch, i, item, onClose, userId]);

  return (
    <aside className="click-item_container">
      <div className="click-item">
        <button className="click-item__close" onClick={onClose}>
          X
        </button>
        <div className="click-item__metadata">
          <img src={picture} alt={sort} className="click-item__picture" />
          <div className="click-item__description">
            <p className="click-item__name">{name}</p>
            <p className="click-item__sort">{sort}</p>
            <p className="click-item__amount">{amount}</p>
            <p className="click-item__price">{price.toLocaleString()}원</p>
            <div className="click-item__count">
              <button
                className="click-item__minus"
                onClick={decrease}
              >
                -
              </button>
              <p className="click-item__number">{i}</p>
              <button
                className="click-item__plus"
                onClick={increase}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="total-price">
          <p className="total-price__string">총 상품금액</p>
          <div className="total-price__count_price">
            <p className="total-price__count">총 수량 {i}개</p>
            <p className="total-price__price">
              {(i * price).toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="click-item__btn">
          <button onClick={onClick}>
            장바구니
          </button>
          <Link to="/order" onClick={onClick}>
            주문하기
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default ClickItem;
