import moment from "moment";
import { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import { isUserLoggedIn, getToken } from "../utils/auth";

function Board() {
  const isLoggedIn = isUserLoggedIn();

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

  const columns = {
    plan: {
      id: "plan",
      title: "Plan",
      tasks: null,
    },
    ongoing: {
      id: "ongoing",
      title: "Ongoing",
      tasks: null,
    },
    finished: {
      id: "finished",
      title: "Finished",
      tasks: null,
    },
  };
  if (data && data.length > 0) {
    var planTasks = data.filter((task) => task.status === "plan");
    var ongoingTasks = data.filter((task) => task.status === "ongoing");
    var finishedTasks = data.filter((task) => task.status === "finished");

    columns.plan.tasks = planTasks;
    columns.ongoing.tasks = ongoingTasks;
    columns.finished.tasks = finishedTasks;
  }

  var columnOrder = ["plan", "ongoing", "finished"];

  const renderTasks = (status) => {
    return columns[status].tasks.map((task) => (
      <div
        className="board-task"
        key={task.id}
        onClick={() => handleClickOpenDialog(task)}
      >
        <h3 className="board-task-title">{task.title}</h3>
        <p>
          {task.dueDate !== null
            ? !task.allDay
              ? "📅 " +
                moment(task.dueDate).format("MMM DD, YYYY ") +
                moment(task.dueTime, "HH:mm:ss").format("h:mm A")
              : "📅 " + moment(task.dueDate).format("MMM DD, YYYY")
            : ""}
        </p>
        <p>🏷️ {task.label}</p>
      </div>
    ));
  };

  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShow] = useState(false);

  const handleCloseModal = () => {
    setShow(false);
  };

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
    handleCloseModal();
  };

  const handleClickOpenDialog = (task) => {
    setSelectedTask(task);
    setShow(true);
  };

  const handleDeleteTask = () => {
    const updatedTasks = data.filter((t) => t.id !== selectedTask.id);
    setData(updatedTasks);
  };


  return (
    <div className="content" id="board">
      <div className="board-all-status">
        {columnOrder.map((status) => {
          return (
            <div className="board-status" key={status.id}>
              <h1>{columns[status].title}</h1>
              <hr />
              <div className="board-tasks-container">
                {columns[status].tasks && columns[status].tasks.length > 0
                  ? renderTasks(status)
                  : "No Task to display"}
              </div>
            </div>
          );
        })}
      </div>
      {showModal && (
        <TaskModal
          task={selectedTask}
          showModal={showModal}
          onHide={handleCloseModal}
          onSave={handleCloseModalWithChange}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default Board;
