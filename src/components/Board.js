import moment from "moment";
import { useState, useEffect } from "react";
import TaskModal from "./TaskModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    return columns[status].tasks.map((task, index) => (
      <Draggable draggableId={task.id} index={index} key={task.id}>
        {(provided, snapshot) => (
          <div
            className="board-task"
            key={task.id}
            onClick={() => handleClickOpenDialog(task)}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
        )}
      </Draggable>
    ));
  };

  // Drag and drop logic
  var onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    } else if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    } else {
      const start = columns[source.droppableId];
      const finish = columns[destination.droppableId];
      if (start.id === finish.id) {
        const newTasks = Array.from(start.tasks);
        newTasks.splice(source.index, 1);
        var task = data.find((task) => task.id == draggableId);
        newTasks.splice(destination.index, 0, task);
        setColumns({
          ...columns,
          [start.id]: { ...start, tasks: newTasks },
        });
        return;
      } else {
        const startTasks = Array.from(start.tasks);
        startTasks.splice(source.index, 1);
        const newStart = {
          ...start,
          tasks: startTasks,
        };
        const finishTasks = Array.from(finish.tasks);
        var task = data.find((task) => task.id == draggableId);
        finishTasks.splice(destination.index, 0, task);
        const newFinish = {
          ...finish,
          tasks: finishTasks,
        };
        const newColumns = {
          ...columns,
          [source.droppableId]: newStart,
          [destination.droppableId]: newFinish,
        };
        setColumns(newColumns);
        return;
      }
    }
  };

  // Modal logic
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-all-status">
          {columnOrder.map((status) => {
            return (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="board-status"
                    key={status.id}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h1>{columns[status].title}</h1>
                    <hr />
                    <div className="board-tasks-container">
                      {columns[status].tasks.length > 0
                        ? renderTasks(status)
                        : "No Task to display"}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
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
      </DragDropContext>
    </div>
  );
}

export default Board;
