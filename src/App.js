import React, { useState } from "react";
import Data from "./data";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { ShoeDetail, Jumbotron, ShoeContainer, Navi } from "./Components";
import axios from "axios";
import Cart from "./Cart";

function App() {
  let [shoes, shoesChange] = useState(Data);
  let [btnFlag, setBtnFlag] = useState(true);
  let [inventory, setInventory] = useState([10, 11, 12]);
  return (
    <div className="App">
      <Navi />
      <Switch>
        <Route exact path="/">
          <Jumbotron />
          <ShoeContainer shoes={shoes} inventory={inventory} />
          {btnFlag ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((res) => {
                    shoesChange([...shoes, ...res.data]);
                    setBtnFlag(false);
                  })
                  .catch(() => {
                    console.log("실패");
                  });
              }}
            >
              더보기
            </button>
          ) : null}
        </Route>
        <Route exact path="/detail/:id">
          <ShoeDetail
            shoes={shoes}
            inventory={inventory}
            setInventory={setInventory}
          />
        </Route>

        <Route path="/cart">
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
