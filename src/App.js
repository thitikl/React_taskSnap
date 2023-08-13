import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';

import data from './data/MOCK_DATA.json';
import "./styles.css";

import Navbar from "./Navbar";



export default function App() {
  const [tasks, setTasks] = useState(data);
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Navbar data={tasks} modifyData={setTasks} />
      </div>
    </BrowserRouter>
    <Toaster  position="bottom-center"  reverseOrder={false} />
    </>
  );
}
