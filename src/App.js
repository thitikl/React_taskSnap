import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Tasks from "./components/Tasks";
import Board from "./components/Board";
import TaskSnapCalendar from "./components/Calendar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AccountPage from "./components/AccountPage";
import NavbarWrapper from "./components/NavbarWrapper";
import Sidebar from "./components/Sidebar";

import "./styles.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavbarWrapper>
            <Sidebar />
          </NavbarWrapper>
        </div>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/board" element={<Board />} />
          <Route path="/calendar" element={<TaskSnapCalendar />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
