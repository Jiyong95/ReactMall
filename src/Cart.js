import React, { useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props) {
  let state = useSelector((state) => state);
  console.log("state", state);
  let dispatch = useDispatch();
  console.log("dispatch", dispatch);
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>
          {state.reducer.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch({ type: "plus", payload: e.id });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "minus", payload: e.id });
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alertFlag ? (
        <div className="my-alert">
          <p>지금 구매시 신규 할인</p>
          <button
            onClick={() => {
              props.dispatch({ type: "flag" });
            }}
          >
            닫기
          </button>
        </div>
      ) : null}
      {/* <Parent name="존박" age="20"></Parent> */}
    </div>
  );
}
/*
function Parent(props) {
  return (
    <div>
      <Child1 name={props.name}></Child1>
      <Child2 name={props.age}></Child2>
    </div>
  );
}

function Child1(props) {
  console.log(props);
  //이 방법도 되는데?
  useEffect(() => console.log("Child1"), [props.name]);
  return <div>1111</div>;
}
let Child2 = memo(function () {
  useEffect(() => console.log("Child2"));
  return <div>2222</div>;
});
*/
//redux store 데이터 가져와서 props로 변환해주는 함수
// function func(state) {
//   console.log(state);
//   return {
//     state: state.reducer,
//     alertFlag: state.reducer2,
//   };
// }
export default Cart;
// export default Cart;
