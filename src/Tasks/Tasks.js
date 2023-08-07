import React from 'react';
import Completed from './completed.png'
import Upcoming from './upcoming.png'
import Today from './today.png'
import './style.css'

export default function Tasks(props) {
  const { data: tasksData } = props;

  const renderTasks = (tasks,src) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div className="tasks" style={{display:'flex', cursor:'pointer'}} key={task.id} onClick={() => alert("Task Edit Pop Will Be here")}>
        <img src={src} />
        <div>
          <h3>{task.title}</h3>
          <p>{task.due}</p>
          </div>
        </div>

      ))
    ) : (
      <p>No tasks for this status</p>
    );
  };
  const upcomingTasks = tasksData.filter((task) => task.status === 'plan');
  const todayTasks = tasksData.filter((task) => task.status === 'ongoing');
  const finishedTasks = tasksData.filter((task) => task.status === 'finished');

  return (
    <div className='task-main'>
      <h1>TASKS</h1>
      <br/>
      <h2>UPCOMING</h2>
      {renderTasks(upcomingTasks, Upcoming)}

      <h2>TODAY</h2>
      {renderTasks(todayTasks, Today)}

      <h2>FINISHED</h2>
      {renderTasks(finishedTasks, Completed)}
    </div>
  );
}