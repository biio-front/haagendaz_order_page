import React from "react";
import { connect } from "react-redux";
import { remove } from "reducers/cart";
import { addCheck, removeAllCheck } from "reducers/checkOrderItem";
import deleteStorage from "Storage/deleteStorage";

function DeleteCheck({ items, check, deleteItem_cart, deleteItem_LS, addCheck_Cart, removeAllCheck_Cart }) {
  // 모든 아이템 체크하기
  const checkAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = true);
    items.forEach(item => addCheck_Cart(item.id));
  }

  // 모든 아이템 체크 해제
  const unCheckAll = () => {
    const checkbox = document.querySelectorAll('[name=chk_delete]');
    checkbox.forEach(li => li.checked = false);
    removeAllCheck_Cart();
  }

  // 모든 아이템 체크하기 토글 버튼
  const toggleCheckAll = e => {
    e.target.checked ? checkAll() : unCheckAll();
  }

  console.log(items);
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
              deleteItem_cart(check);
              deleteItem_LS(check);
            }}
          >
            선택한 상품 삭제하기
          </button>
        </div>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return { items: state.cart, check: state.checkOrderItem };
}
function mapDispatchToProps(dispatch, ownProps) {
  const { userId } = ownProps;
  return {
    deleteItem_cart: checked_id => dispatch(remove(checked_id)),
    deleteItem_LS: checked_id => deleteStorage(checked_id, userId),
    addCheck_Cart: checked_id => dispatch(addCheck(checked_id)),
    removeAllCheck_Cart: () => dispatch(removeAllCheck()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCheck);
