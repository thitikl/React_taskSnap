import moment from "moment";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      if (start === finish) {
        const newTasks = Array.from(start.tasks);
        newTasks.splice(source.index, 1);
        var task = data.find((task) => task.id == draggableId);
        newTasks.splice(destination.index, 0, task);
        const newColumn = {
          ...start,
          tasks: newTasks,
        };
        const newColumns = {
          ...columns,
          [destination.droppableId]: newColumn,
        };
        setColumns(newColumns);
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

  return (
    <div className="content" id="board">
      <DragDropContext onDragEnd={onDragEnd}>
        {columnOrder.map((status) => {
          return (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="board-status"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1>{columns[status].title}</h1>
                  <hr />
                  <div className="board-tasks-container">
                    {columns[status].tasks.map((task, index) => {
                      return (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(provided, snapshot) => (
                            <div
                              className="board-task"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h3 className="board-task-title">{task.title}</h3>
                              <p>
                                {task.dueDate != ""
                                  ? task.dueTime != ""
                                    ? "📅 " +
                                      moment(task.dueDate).format(
                                        "MMM DD, YYYY "
                                      ) +
                                      moment(task.dueTime, "HH:mm:ss").format(
                                        "h:mm A"
                                      )
                                    : "📅 " +
                                      moment(task.dueDate).format(
                                        "MMM DD, YYYY"
                                      )
                                  : ""}
                              </p>
                              <p>🏷️ {task.label}</p>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
