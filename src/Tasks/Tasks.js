import React, { useState } from "react";
import CustomizedDialogs from './CustomizedDialogs';
import Completed from "./completed.png";
import Upcoming from "./upcoming.png";
import Today from "./today.png";
import MOCK_DATA from '../data/MOCK_DATA.json';
import "./style.css";

export default function Tasks() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClickOpenDialog = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveChanges = (editedTask) => {
    const updatedData = MOCK_DATA.map((task) =>
      task.title === editedTask.title ? editedTask : task
    );

    setTasks(updatedData);
    setSelectedTask(editedTask);
    setOpenDialog(false);
  };

  const [tasks, setTasks] = useState(MOCK_DATA);

  const renderTasks = (tasks, src) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          className="tasks"
          style={{ display: "flex", cursor: "pointer" }}
          key={task.title} 
          onClick={() => handleClickOpenDialog(task)}
        >
          <img src={src} alt={task.title} />
          <div>
            <h3 className="title">{task.title}</h3>
          </div>
        </div>
      ))
    ) : (
      <p>No tasks for this status</p>
    );
  };

  const upcomingTasks = tasks.filter((task) => task.status === "plan");
  const todayTasks = tasks.filter((task) => task.status === "ongoing");
  const finishedTasks = tasks.filter((task) => task.status === "finished");

  return (
    <div className="task-main">
      <h1>TASKS</h1>
      <br />
      <div className="all-tasks">
        <div className="task-section">
          <h2>PLAN</h2>
          {renderTasks(upcomingTasks, Upcoming)}
        </div>
        <div className="task-section">
          <h2>ONGOING</h2>
          {renderTasks(todayTasks, Today)}
        </div>
        <div className="task-section">
          <h2>FINISHED</h2>
          {renderTasks(finishedTasks, Completed)}
        </div>
      </div>
      {selectedTask && (
        <CustomizedDialogs
          open={openDialog}
          onClose={handleCloseDialog}
          task={selectedTask}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
}
