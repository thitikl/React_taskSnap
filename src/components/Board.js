import moment from "moment";
import { useState } from "react";
import TaskModal from "./TaskModal";

function Board(props) {
  var data = props.data;
  const [columns, setColumns] = useState({
    plan: {
      id: "plan",
      title: "Plan",
      tasks: [],
    },
    ongoing: {
      id: "ongoing",
      title: "Ongoing",
      tasks: [],
    },
    finished: {
      id: "finished",
      title: "Finished",
      tasks: [],
    },
  });
  data.map((task) => {
    if (task.status == "plan") {
      columns.plan.tasks.push(task);
    } else if (task.status == "ongoing") {
      columns.ongoing.tasks.push(task);
    } else if (task.status == "finished") {
      columns.finished.tasks.push(task);
    }
  });

  var columnOrder = ["plan", "ongoing", "finished"];

  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShow] = useState(false);

  const handleCloseModal = () => {
    console.log("close");
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
      {columnOrder.map((status) => {
        return (
          <div className="board-status" key={status.id}>
            <h1>{columns[status].title}</h1>
            <hr />
            <div className="board-tasks-container">
              {columns[status].tasks.map((task) => {
                return (
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
                );
              })}
            </div>
          </div>
        );
      })}
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
