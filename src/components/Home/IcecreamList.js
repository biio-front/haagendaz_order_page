import React from 'react';
import Items from "./Items";
import { HashRouter as Route, Switch } from "react-router-dom";

function IcecreamList({ data, onClickItem }) {
  const pint = Object.values(data.pint);
  const mini = Object.values(data.mini);
  const bar = Object.values(data.bar);
  const con = Object.values(data.con);
  return (
    <Switch>
      <Route exact path="/">
        <Items data={pint} onClickItem={e => onClickItem(pint, e)} />
      </Route>
      <Route path='/mini'>
        <Items data={mini} onClickItem={e => onClickItem(mini, e)} />
      </Route>
      <Route path='/bar'>
        <Items data={bar} onClickItem={e => onClickItem(bar, e)} />
      </Route>
      <Route path='/con'>
        <Items data={con} onClickItem={e => onClickItem(con, e)} />
      </Route>
    </Switch>
  );
}

export default IcecreamList;