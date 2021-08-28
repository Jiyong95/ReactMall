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

let base = [];
//변경된 state를 return하는 함수
//state = base : default인자 설정
function reducer(state = base, action) {
  // console.log(action);
  if (action.type === "항목추가") {
    let copy = [...state];
    let found = state.findIndex((e) => {
      return e.id === action.payload.id;
    });
    if (found >= 0) {
      copy[found].quan++;
    } else copy.push(action.payload);
    return copy;
  } else if (action.type === "plus") {
    let newState = [...state];
    newState[action.payload].quan++;
    return newState;
  } else if (action.type === "minus") {
    let newState = [...state];
    newState[action.payload].quan--;
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
