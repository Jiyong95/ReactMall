import React, { useState } from "react";
import Data from "./data";
import "./App.css";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { ShoeDetail, Jumbotron, ShoeContainer, Navi } from "./Components";

function App() {
  let [shoes, shoesChange] = useState(Data);

  return (
    <div className="App">
      <Navi />
      <Switch>
        <Route exact path="/">
          <Jumbotron />
          <ShoeContainer shoes={shoes} />
        </Route>
        <Route exact path="/detail/:id">
          <ShoeDetail shoes={shoes} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
