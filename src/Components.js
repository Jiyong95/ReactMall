import {
  Row,
  Col,
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

export function Navi() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Shoeshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/detail">Detail</Link>
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export function Jumbotron() {
  return (
    <div className="jumbotron">
      <h1>20% Season Off</h1>
      <p>This is a simple JidongMarket with React!</p>
      <Button variant="primary">Primary</Button>{" "}
    </div>
  );
}
export function ShoeContainer(props) {
  let { shoes } = props;
  return (
    <Container>
      <Row>
        {shoes.map((el, i) => (
          <ShoeList key={i} shoeInfo={el} />
        ))}
      </Row>
    </Container>
  );
}

export function ShoeList(props) {
  let history = useHistory();
  const {
    shoeInfo: { title, content, price, id },
  } = props;
  function moveDetail() {
    let url = "detail/" + id;
    history.push(url);
  }
  return (
    <Col onClick={moveDetail}>
      <img
        src={"https://codingapple1.github.io/shop/shoes" + (id + 1) + ".jpg"}
        alt="shoe1"
        width="100%"
      />
      <h4>{title}</h4>
      <p>{content}</p>
      <p>{price}</p>
    </Col>
  );
}

let box = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

export function ShoeDetail(props) {
  let { id } = useParams();
  let history = useHistory();
  let findShoe = props.shoes.find((x) => x.id == id);
  return (
    <div className="container">
      <box>
        <제목 색상={"blue"}>상세페이지</제목>
      </box>
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" + (+id + 1) + ".jpg"
            }
            alt="shoeDetail"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <button className="btn btn-danger">주문하기</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
              //   history.push('/');  /로 이동
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}
