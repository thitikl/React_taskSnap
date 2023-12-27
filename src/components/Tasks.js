import { useState } from "react";
import moment from "moment";

// Import TaskModal and its methods
import TaskModal from "./TaskModal";

// TODO change to dynamic icon
// https://palett.es/
// import icons
import designIcon from "../icon/design.png";
import developmentIcon from "../icon/development.png";
import infrastructureIcon from "../icon/infrastructure.png";
import meetingIcon from "../icon/meeting.png";
import migrationIcon from "../icon/migration.png";
import optimizationIcon from "../icon/optimization.png";
import planningIcon from "../icon/planning.png";
import reviewIcon from "../icon/review.png";
import securityIcon from "../icon/security.png";
import testingIcon from "../icon/testing.png";
import trainingIcon from "../icon/training.png";
import completed from "../icon/completed.png";

export default function Tasks(props) {
  const iconSelection = (task) => {
    if (task.label.toLowerCase() === "design") return designIcon;
    else if (task.label.toLowerCase() === "development") return developmentIcon;
    else if (task.label.toLowerCase() === "infrastructure")
      return infrastructureIcon;
    else if (task.label.toLowerCase() === "meeting") return meetingIcon;
    else if (task.label.toLowerCase() === "migration") return migrationIcon;
    else if (task.label.toLowerCase() === "optimization")
      return optimizationIcon;
    else if (task.label.toLowerCase() === "planning") return planningIcon;
    else if (task.label.toLowerCase() === "review") return reviewIcon;
    else if (task.label.toLowerCase() === "security") return securityIcon;
    else if (task.label.toLowerCase() === "testing") return testingIcon;
    else if (task.label.toLowerCase() === "training") return trainingIcon;
    else return completed;
  };

  const renderTasks = (tasks, status) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          className="tasks"
          style={{ display: "flex", cursor: "pointer" }}
          key={task.title}
          // TODO change onclick function
          onClick={() => handleClickOpenDialog(task)}
        >
          {/* TODO Edit img tag */}
          <img src={iconSelection(task)} alt={task.title} />
          <div>
            <h3 className="title">{task.title}</h3>
            {status === "ongoing" && (
              <p>
                📅{" "}
                {task.dueTime != ""
                  ? moment(task.dueDate).format("MMM DD, YYYY ") +
                    moment(task.dueTime, "HH:mm:ss").format("h:mm A")
                  : moment(task.dueDate).format("MMM DD, YYYY")}
              </p>
            )}
            <p>🧑 {task.assignedTo}</p>
            <p>🏷️ {task.label}</p>
          </div>
        </div>
      ))
    ) : (
      <h5>No tasks for this status</h5>
    );
  };

  const dueTodayTasks = props.data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isSame(moment().format("YYYY-MM-DD"), "day")
  );

  const dueInWeekTasks = props.data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isAfter(moment().format("YYYY-MM-DD"), "day") &&
      moment(task.dueDate).isBefore(moment().add(7, "days"))
  );

  const dueLaterTasks = props.data.filter(
    (task) =>
      task.status === "ongoing" &&
      moment(task.dueDate).isAfter(moment().add(7, "days"))
  );

  const planTasks = props.data.filter((task) => task.status === "plan");

  const finishedTasks = props.data.filter((task) => task.status === "finished");

  // Selected task for modal showing
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShow] = useState(false);

  const handleCloseModal = () => setShow(false);

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
    setShow(false);
  };

  const handleClickOpenDialog = (task) => {
    setSelectedTask(task);
    setShow(true);
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
      {showModal && (
        <TaskModal
          task={selectedTask}
          showModal={showModal}
          onClose={handleCloseModal}
          onSave={handleCloseModalWithChange}
        />
      )}
    </div>
  );
}
