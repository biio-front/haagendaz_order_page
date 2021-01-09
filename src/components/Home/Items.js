import React from "react";
import Item from "components/Home/Item";
import "css/Items.css";

function Items({ data, onClickItem }) {
  return (
    <article>
      <ul
        className="items"
        onClick={e => {
          onClickItem(e);
        }}
      >
        {data.map(item => {
          return (
            <Item
              key={item.id}
              {...item}
            />
          );
        })}
      </ul>
    </article>
  );
}

export default Items;
