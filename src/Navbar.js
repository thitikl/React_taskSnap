import { Routes, Route, Link } from "react-router-dom";
import Board from "./Board/Board";
import Calendar from "./Calendar/Calendar";
import Tasks from "./Tasks/Tasks";

export default function Navbar() {
    return (
        <>
            <div>
                <div className="nav-side">
                    <nav className="navbar bg-dark navbar-dark flex-column">
                        <Link className="navbar-brand" to="/" >
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCfgTS3DanyDhzb8V6bnpZivIsRxKWzf-Q1Q&usqp=CAU" // Replace with the URL or path to your logo
                                width="200"
                                height="100"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                        </Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >
                                    Tasks
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/board">
                                    Board
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/calendar">
                                    Calendar
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Tasks />} />
                <Route path="/board" element={<Board />} />
                <Route path="/calendar" element={<Calendar />} />    
            </Routes>
        </>
        
    );
}

