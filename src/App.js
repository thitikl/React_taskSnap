import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import moment from "moment";

import data from './data/MOCK_DATA.json';
import "./styles.css";

import Sidebar from "./Sidebar";

// Purpose of this function is to make dates of mock data dynamic on current date. It can be disabled by commenting out this function.
const mockDataUpdating = () => {
  // Due today data
  Object.values(data)[0].startDate = moment().subtract(3, 'days').format('YYYY-MM-DD');
  Object.values(data)[0].dueDate = moment().format('YYYY-MM-DD');

  // Due in a week data
  Object.values(data)[1].startDate = moment().add(2, 'days').format('YYYY-MM-DD');
  Object.values(data)[1].dueDate = moment().add(4, 'days').format('YYYY-MM-DD');

  Object.values(data)[2].startDate = moment().add(4, 'days').format('YYYY-MM-DD');
  Object.values(data)[2].dueDate = moment().add(6, 'days').format('YYYY-MM-DD');

  // Due later data
  Object.values(data)[3].startDate = moment().add(10, 'days').format('YYYY-MM-DD');
  Object.values(data)[3].dueDate = moment().add(14, 'days').format('YYYY-MM-DD');
}
mockDataUpdating();  

export default function App() {
  const [tasks, setTasks] = useState(data);
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Sidebar data={tasks} modifyData={setTasks} />
      </div>
    </BrowserRouter>
    <Toaster  position="bottom-center"  reverseOrder={false} />
    </>
  );
}
