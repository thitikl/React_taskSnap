import { useState, useEffect } from "react";
import moment from "moment";

// Import TaskModal and its methods
import TaskModal from "./TaskModal";
import { newTask } from "../constant/newTask";
import { getToken, isUserLoggedIn } from "../utils/auth";

// TODO change to dynamic icon
// https://palett.es/

export default function Tasks(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  if (!isLoggedIn) {
    window.location.href = "/login";
  }

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const renderTasks = (tasks, status) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          className="tasks"
          style={{ display: "flex", cursor: "pointer" }}
          key={task.id}
          onClick={() => handleClickOpenDialog(task)}
        >
          <img
            src={require("../icon/" + task.label.toLowerCase() + ".png")}
            alt={task.title}
          />
          <div>
            <h3 className="title">{task.title}</h3>
            {status === "ongoing" && (
              <p>
                📅{" "}
                {!task.allDay
                  ? moment(task.dueDate).format("MMM DD, YYYY ") +
                    moment(task.dueTime, "HH:mm:ss").format("h:mm A")
                  : moment(task.dueDate).format("MMM DD, YYYY")}
              </p>
            )}
            <p>🏷️ {task.label}</p>
          </div>
        </div>
      ))
    ) : (
      <h5>No tasks for this status</h5>
    );
  };

  const dueTodayTasks = data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isSame(moment().format("YYYY-MM-DD"), "day")
  );

  const dueInWeekTasks = data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isAfter(moment().format("YYYY-MM-DD"), "day") &&
      moment(task.dueDate).isBefore(moment().add(7, "days"))
  );

  const dueLaterTasks = data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isAfter(moment().add(7, "days"))
  );

  const planTasks = data.filter((task) => task.status === "plan");

  const finishedTasks = data.filter((task) => task.status === "finished");

  // Selected task for modal showing
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShow] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleCloseModal = () => setShow(false);

  const handleCloseModalWithChange = (editedTask) => {
    setSelectedTask(editedTask);
    const updatedTasks = data.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask;
      } else {
        return task;
      }
    });
    setData(updatedTasks);
    setShow(false);
  };

  const handleClickOpenDialog = (task) => {
    setSelectedTask(task);
    setShow(true);
  };

  const handleClickNewTask = () => {
    setShowNewModal(true);
  };

  const handleCloseNewModal = () => {
    setShowNewModal(false);
  };

  const handleCloseNewModalWithChange = (editedTask) => {
    const updatedTasks = data;
    updatedTasks.push(editedTask);
    props.modifyData(updatedTasks);
    setShowNewModal(false);
  };

  return (
    <div className="content task-main" id="tasks">
      <div className="all-tasks">
        {dueTodayTasks.length > 0 && (
          <div className="task-section">
            <h1>Due today</h1>
            <hr />
            {renderTasks(dueTodayTasks, "ongoing")}
            <br />
          </div>
        )}

        {dueInWeekTasks.length > 0 && (
          <div className="task-section">
            <h1>Due in a week</h1>
            <hr />
            {renderTasks(dueInWeekTasks, "ongoing")}
            <br />
          </div>
        )}

        {dueLaterTasks.length > 0 && (
          <div className="task-section">
            <h1>Due later</h1>
            <hr />
            {renderTasks(dueLaterTasks, "ongoing")}
            <br />
          </div>
        )}

        {planTasks.length > 0 && (
          <div className="task-section">
            <h1>Plan</h1>
            <hr />
            {renderTasks(planTasks, "plan")}
            <br />
          </div>
        )}

        {finishedTasks.length > 0 && (
          <div className="task-section">
            <h1>Finished</h1>
            <hr />
            {renderTasks(finishedTasks, "finished")}
            <br />
          </div>
        )}
      </div>
      <div id="add-task" onClick={handleClickNewTask}>
        <div id="vertical"></div>
        <div id="horizontal"></div>
      </div>
      {showModal && (
        <TaskModal
          task={selectedTask}
          showModal={showModal}
          onHide={handleCloseModal}
          onSave={handleCloseModalWithChange}
        />
      )}
      {showNewModal && (
        <TaskModal
          task={newTask}
          mode="new"
          showModal={showNewModal}
          onHide={handleCloseNewModal}
          onSave={handleCloseNewModalWithChange}
        />
      )}
    </div>
  );
}
