import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

function reducer2(state = true, action) {
  if (action.type === "flag") return false;
  return true;
}

let base = [
  { id: 0, name: "멋진 신발", quan: 2 },
  { id: 1, name: "멋진 신발2", quan: 1 },
];
//변경된 state를 return하는 함수
//state = base : default인자 설정
function reducer(state = base, action) {
  console.log(action);
  if (action.type === "addList") {
    let copy = [...state];
    copy.push(action.payload);
    return copy;
  } else if (action.type === "plus") {
    let newState = [...base];
    newState[0].quan++;
    return newState;
  } else if (action.type === "minus") {
    let newState = [...base];
    newState[0].quan--;
    return newState;
  } else return state;
}
let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
