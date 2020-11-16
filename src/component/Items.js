import React from "react";
import Item from "./Item";
import "../css/Items.css";

function Items(props) {
  const items = props.data;

  return (
    <section>
      <ul
        className="items"
        data-id="none"
        onClick={e => {
          e.preventDefault();
          props.onClickItem(e);
        }}
      >
        {items.map(item => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              sort={item.sort}
              price={item.price.toLocaleString()}
              picture={item.picture}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Items;
