import React from "react";
import { remove } from "reducers/cart";
import { addCheck, removeAllCheck } from "reducers/checkOrderItem";
import deleteStorage from "logic/deleteStorage";
import { useDispatch, useSelector } from "react-redux";

function DeleteCheck({ userId }) {
  const items = useSelector(state => state.cart);
  const check = useSelector(state => state.checkOrderItem);
  const dispatch = useDispatch();
    
  // 모든 아이템 체크하기
  const checkAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = true);
    items.forEach(item =>  dispatch(addCheck(item.id)));
  }

  // 모든 아이템 체크 해제
  const unCheckAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = false);
    dispatch(removeAllCheck());
  }

  // 모든 아이템 체크하기 토글 버튼
  const toggleCheckAll = e => {
    e.target.checked ? checkAll() : unCheckAll();
  }

  return (
    <>
      {items.length > 0 && (
        <div className="order-list__delete">
          <input
            type="checkbox"
            onClick={e => toggleCheckAll(e)}
          />
          <button
            className="order-list__delete-btn"
            onClick={() => {
              dispatch(remove(check));
              deleteStorage(check, userId);
            }}
          >
            선택한 상품 삭제하기
          </button>
        </div>
      )}
    </>
  );
}

export default DeleteCheck;
