import React from "react";
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
                      dispatch({ type: "plus" });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "minus" });
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
    </div>
  );
}

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
