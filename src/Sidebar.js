import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Board from "./components/Board";
import TaskSnapCalendar from "./components/Calendar";
import Tasks from "./components/Tasks";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AccountPage from "./components/AccountPage";
import fullLogo from "./img/full-logo.png";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { isUserLoggedIn } from "./utils/auth";

export default function Sidebar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  return (
    <>
      <Navbar
        key="lg"
        expand="lg"
        className="bg-body-tertiary mb-3"
        variant="dark"
      >
        <Container fluid id="nav-container">
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Brand href="/">
            <img src={fullLogo} alt="logo" />
          </Navbar.Brand>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                <img src={fullLogo} alt="logo" />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end flex-grow-1 pe-3"
                defaultActiveKey="/"
              >
                <Nav.Link to="/" as={NavLink}>
                  Tasks
                </Nav.Link>
                <Nav.Link to="/board" as={NavLink}>
                  Board
                </Nav.Link>
                <Nav.Link to="/calendar" as={NavLink}>
                  Calendar
                </Nav.Link>
                <div className="filling-space"></div>
                {isLoggedIn ? (
                  <Nav.Link to="/account" as={NavLink}>
                    Account
                  </Nav.Link>
                ) : (
                  <Nav.Link to="/login" as={NavLink}>
                    Login
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/"
          element={<Tasks data={props.data} modifyData={props.modifyData} />}
        />
        <Route
          path="/board"
          element={<Board data={props.data} modifyData={props.modifyData} />}
        />
        <Route
          path="/calendar"
          element={
            <TaskSnapCalendar data={props.data} modifyData={props.modifyData} />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
}
