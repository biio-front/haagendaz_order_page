import React, { Component } from "react";
import "./App.css";
import icecreamData from "./data/data.json";
import Header from "./component/Header";
import Nav from "./component/Nav";
import Items from "./component/Items";
import ClickItem from "./component/ClickItem";
import ShoppingCart from "./component/ShoppingCart";
import Order from "./component/Order";
import Footer from "./component/Footer";

class App extends Component {
  state = {
    mode: "pint",
    is_item_clicked: false,
    item_clicked: [],
    items_in_cart: [],
  };

  changeMode(changeMode) {
    this.setState({ mode: changeMode });
  }

  // 메뉴 클릭 시 화면 바뀜.
  changeMenu(e) {
    const selectedMenu = e.target.dataset.menu;
    this.changeMode(selectedMenu);
  }

  // 아이스크림 리스트(메뉴아래 항목들)을 클릭 했을 때, 팝업창이 뜸.
  clickItem(data, e) {
    const selectedItem = e.target.dataset.id;
    const target = data.find(item => item.id === Number(selectedItem));
    if (target === null) return;
    this.setState({ is_item_clicked: true, item_clicked: target });
  }

  // 팝업 창의 x표를 누를 시, 팝업창이 사라짐.
  closeItemPopup() {
    this.setState({ is_item_clicked: false, item_clicked: [] });
  }

  // 아이스크림 카트에 담기
  clickForCart(item_data) {
    const item = item_data;
    const { items_in_cart } = this.state;
    const _items_in_cart = Array.from(items_in_cart);
    _items_in_cart.push(item);
    this.setState({ items_in_cart: _items_in_cart });
  }

  // 메뉴를 클릭 했을 때, 메뉴에 해당하는 아이스크림 리스트가 화면에 표시됨.
  changeItem() {
    const { mode } = this.state;
    const data = icecreamData;

    if (mode === "pint")
      return (
        <Items
          data={data.pint}
          onClickItem={e => this.clickItem(data.pint, e)}
        />
      );
    else if (mode === "mini")
      return (
        <Items
          data={data.mini}
          onClickItem={e => this.clickItem(data.mini, e)}
        />
      );
    else if (mode === "bar")
      return (
        <Items 
          data={data.bar} 
          onClickItem={e => this.clickItem(data.bar, e)} 
        />
      );
    else if (mode === "con")
      return (
        <Items 
          data={data.con} 
          onClickItem={e => this.clickItem(data.con, e)} 
        />
      );
  }

  render() {
    const { mode, is_item_clicked, item_clicked, items_in_cart } = this.state;

    return (
      <div className="App">
        <Header onHome={() => this.changeMode("pint")} />
        {mode !== "order" ? (
          <Nav onChangePage={e => this.changeMenu(e)} />
        ) : null}
        {mode !== "order" ? (
          <main>
            {this.changeItem()}
            {is_item_clicked ? (
              <ClickItem
                item={item_clicked}
                onClose={() => this.closeItemPopup()}
                onPutItem={item_data => this.clickForCart(item_data)}
                onChangePage={() => this.changeMode("order")}
              />
            ) : null}
            <ShoppingCart
              items={items_in_cart}
              onChangePage={() => this.changeMode("order")}
            />
          </main>
        ) : (
          <Order items={items_in_cart} />
        )}
        <Footer />
      </div>
    );
  }
}

export default App;
