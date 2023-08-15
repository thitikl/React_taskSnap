import React, { useState } from "react";
import CustomizedDialogs from './CustomizedDialogs';
import Completed from "./completed.png";
// import Upcoming from "./upcoming.png";
// import Today from "./today.png";
import MOCK_DATA from '../data/MOCK_DATA.json';
import "./tasks.css";
import moment from 'moment';

// import icons
import designIcon from './icon/design.png';
import developmentIcon from './icon/development.png';
import infrastructureIcon from './icon/infrastructure.png';
import meetingIcon from './icon/meeting.png';
import migrationIcon from './icon/migration.png';
import optimizationIcon from './icon/optimization.png';
import planningIcon from './icon/planning.png';
import reviewIcon from './icon/review.png';
import securityIcon from './icon/security.png';
import testingIcon from './icon/testing.png';
import trainingIcon from './icon/training.png';

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

  const iconSelection = (task) => {
    if (task.label.toLowerCase() === 'design') return designIcon;
    else if (task.label.toLowerCase() === 'development') return developmentIcon;
    else if (task.label.toLowerCase() === 'infrastructure') return infrastructureIcon;
    else if (task.label.toLowerCase() === 'meeting') return meetingIcon;
    else if (task.label.toLowerCase() === 'migration') return migrationIcon;
    else if (task.label.toLowerCase() === 'optimization') return optimizationIcon;
    else if (task.label.toLowerCase() === 'planning') return planningIcon;
    else if (task.label.toLowerCase() === 'review') return reviewIcon;
    else if (task.label.toLowerCase() === 'security') return securityIcon;
    else if (task.label.toLowerCase() === 'testing') return testingIcon;
    else if (task.label.toLowerCase() === 'training') return trainingIcon;
    else return Completed;
  }

  const [tasks, setTasks] = useState(MOCK_DATA);

  const renderTasks = (tasks, status) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          className="tasks"
          style={{ display: "flex", cursor: "pointer" }}
          key={task.title}
          onClick={() => handleClickOpenDialog(task)}
        >
          <img src={iconSelection(task)} alt={task.title} />
          <div>
            <h3 className="title">{task.title}</h3>
            {status === 'ongoing' &&
              <p>📅 {task.due.includes('T') ? moment(task.due).format("MMM DD, YYYY HH:mm") : moment(task.due).format("MMM DD, YYYY")}</p>
            }
            <p>🧑 {task.assigned_to}</p>
            <p>🏷️ {task.label}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No tasks for this status</p>
    );
  };

  const dueTodayTasks = tasks.filter((task) =>
    task.status === 'ongoing' && moment(task.due).isSame(moment().format('YYYY-MM-DD'), 'day')
  ).sort((a, b) => { new Date(b.due) - new Date(a.due) })

  const dueInWeekTasks = tasks.filter((task) =>
    task.status === 'ongoing' && moment(task.due).isAfter(moment().format('YYYY-MM-DD'), 'day') && moment(task.due).isBefore(moment().add(7, 'days'))
  ).sort((a, b) => { new Date(b.due) - new Date(a.due) })

  const dueLaterTasks = tasks.filter((task) =>
    task.status === 'ongoing' && moment(task.due).isAfter(moment().add(7, 'days'))
  ).sort((a, b) => { new Date(b.due) - new Date(a.due) })

  const planTasks = tasks.filter((task) =>
    task.status === 'plan'
  ).sort((a, b) => { new Date(b.due) - new Date(a.due) })

  const finishedTasks = tasks.filter((task) =>
    task.status === 'finished'
  ).sort((a, b) => { new Date(b.due) - new Date(a.due) })

  return (
    <div className="content task-main">
      <div className="all-tasks">
        {dueTodayTasks.length > 0 &&
          <div className="task-section">

            <h1>Due today</h1>
            <hr />
            {renderTasks(dueTodayTasks, 'ongoing')}
            <br />
          </div>
        }

        {dueInWeekTasks.length > 0 &&
          <div className="task-section">
            <h1>Due in the next 7 days</h1>
            <hr />
            {renderTasks(dueInWeekTasks, 'ongoing')}
            <br />
          </div>
        }

        {dueLaterTasks.length > 0 &&
          <div className="task-section">
            <h1>Due later</h1>
            <hr />
            {renderTasks(dueLaterTasks, 'ongoing')}
            <br />
          </div>
        }

        {planTasks.length > 0 &&
          <div className="task-section">
            <h1>Plan</h1>
            <hr />
            {renderTasks(planTasks, 'plan')}
            <br />
          </div>
        }

        {finishedTasks.length > 0 &&
          <div className="task-section">
            <h1>Finished</h1>
            <hr />
            {renderTasks(dueLaterTasks, 'finished')}
            <br />
          </div>
        }

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
