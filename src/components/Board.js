import moment from "moment";
import { useState, useEffect } from "react";
import TaskModal from "./TaskModal";

function Board(props) {
  var data = props.data;
  const [columns, setColumns] = useState({
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
  });

  var planTasks = data.filter((task) => task.status == "plan");
  var ongoingTasks = data.filter((task) => task.status == "ongoing");
  var finishedTasks = data.filter((task) => task.status == "finished");

  columns.plan.tasks = planTasks;
  columns.ongoing.tasks = ongoingTasks;
  columns.finished.tasks = finishedTasks;

  var columnOrder = ["plan", "ongoing", "finished"];

  const renderTasks = (status) => {
    console.log(columns[status].tasks);
    return columns[status].tasks.map((task) => (
      <div
        className="board-task"
        key={task.id}
        onClick={() => handleClickOpenDialog(task)}
      >
        <h3 className="board-task-title">{task.title}</h3>
        <p>
          {task.dueDate != ""
            ? task.dueTime != ""
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
    const updatedTasks = props.data.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask;
      } else {
        return task;
      }
    });
    props.modifyData(updatedTasks);
    handleCloseModal();
  };

  const handleClickOpenDialog = (task) => {
    setSelectedTask(task);
    setShow(true);
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
                {columns[status].tasks.length > 0
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
        />
      )}
    </div>
  );
}

export default Board;
