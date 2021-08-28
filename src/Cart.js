import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>
              <button onClick={""}>+</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.quan}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

//redux store 데이터 가져와서 props로 변환해주는 함수
function func(state) {
  return {
    state: state,
  };
}
export default connect(func)(Cart);
// export default Cart;
