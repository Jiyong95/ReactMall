import {
  Row,
  Col,
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import "./Components.scss";
import { connect } from "react-redux";
export function Navi() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Shoeshop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail/0">
              detail
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

let Box = styled.div`
  padding: 20px;
`;
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;

function ShoeDetail(props) {
  let [aniSwitch, setAniSwitch] = useState(false);
  let [tab, setTab] = useState(0);
  let [alert, setAlert] = useState(true);
  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  let { id } = useParams();
  let history = useHistory();
  let findShoe = props.shoes.find((x) => x.id == id);
  return (
    <div className="container">
      <Box>
        <제목 className="red">상세페이지</제목>
      </Box>
      {alert ? (
        <div className="my-alert">
          <p>재고가 1개 남았습니다!</p>
        </div>
      ) : null}
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
          <Inven inventory={props.inventory} />

          <button
            className="btn btn-danger"
            onClick={() => {
              props.setInventory([9, 11, 12]);
              props.dispatch({
                type: "항목추가",
                payload: { id, name: props.shoes[id].title, quan: 1 },
              });
              history.push("/cart");
            }}
          >
            주문하기
          </button>
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

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setAniSwitch(false);
              setTab(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setAniSwitch(false);
              setTab(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={aniSwitch} classNames="wow" timeout={600}>
        <TabContent tab={tab} setAniSwitch={setAniSwitch} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.setAniSwitch(true);
  });
  if (props.tab === 0) {
    return <div>0번째 내용입니다.</div>;
  } else return <div>1번째 내용입니다.</div>;
}

function Inven(props) {
  return <p>재고:{props.inventory[0]}</p>;
}

//redux store 데이터 가져와서 props로 변환해주는 함수
function func(state) {
  console.log(state);
  return {
    state: state.reducer,
    alertFlag: state.reducer2,
  };
}
export default connect(func)(ShoeDetail);
