import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  finishedMain,
  finishedSub,
  upcomingMain,
  upcomingSub,
  ongoingMain,
  ongoingSub,
  headingcss,
  taskDescription,
} from "./BoardStyles";
import { formatDate } from "./DateFormat";
import { resetServerContext } from "react-beautiful-dnd";

export default function Board(props) {
  const { data: tasksData } = props;
  const [tasks, setTasks] = useState(tasksData);

  const handleOnDragEnd = (result) => {
    try {
      const { source, destination } = result;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return; // Dropped at the same place
      }

      // Filter tasks by source and destination status
      const sourceTasks = tasks.filter(
        (task) => task.status === source.droppableId
      );
      const destinationTasks = tasks.filter(
        (task) => task.status === destination.droppableId
      );

      // Find and remove the dragged task from the source list
      const [draggedTask] = sourceTasks.splice(source.index, 1);

      // If source and destination are the same, the destination tasks are the modified source tasks
      if (source.droppableId === destination.droppableId) {
        sourceTasks.splice(destination.index, 0, draggedTask);
      } else {
        // Else, update status and add to the destination list
        draggedTask.status = destination.droppableId;
        destinationTasks.splice(destination.index, 0, draggedTask);
      }

      // Create a new array with the updated tasks
      const updatedTasks = tasks
        .filter(
          (task) =>
            task.status !== source.droppableId &&
            task.status !== destination.droppableId
        )
        .concat(sourceTasks)
        .concat(destinationTasks);

      // Update the state
      setTasks(updatedTasks);
    } catch (error) {
      console.error("An error occurred during drag-and-drop", error);
      resetServerContext();
    }
  };

  const renderTasks = (tasks, droppableId) => (
    <Droppable droppableId={droppableId} ignoreNonContiguousIndexes>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ minHeight: "80vh" }}
        >
          {tasks.map((task, index) => {
            let id = task.id;
            return (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <div
                    className="Alltasks"
                    style={{ cursor: "pointer" }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="container">
                      <p>
                        <span style={{ color: "#f9eaea", fontSize: "18px" }}>
                          <strong>{task.title}</strong>
                        </span>
                        {task.description && (
                          <>
                            <br />
                            <span style={taskDescription}>
                              {task.description}
                            </span>
                          </>
                        )}
                        <br />
                        <span style={{ color: "#ededed", fontSize: "14px" }}>
                          <i className="bi bi-calendar3-event-fill"></i>
                          <span> </span>
                          {formatDate(task.due)}
                        </span>
                        <br />
                        <span style={{ color: "silver", fontSize: "14px" }}>
                          <i className="bi bi-tags-fill"></i> {task.label}
                        </span>
                        <span style={{ color: "#ededed", fontSize: "14px" }}>
                          <i className="bi bi-chevron-double-right"></i>{" "}
                          {task.assigned_to}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  const upcomingTasks = tasks.filter((task) => task.status === "plan");
  const todayTasks = tasks.filter((task) => task.status === "ongoing");
  const finishedTasks = tasks.filter((task) => task.status === "finished");

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div
          className="fixed-width-sidebar bg-black"
          style={{ width: "240px" }}
        ></div>
        <div className="container-fluid d-flex vh-100 bg-dark">
          <div className="col-md-4 d-flex boarddata" style={ongoingMain}>
            <div style={headingcss}>
              <div className="text-center" style={ongoingSub}>
                Ongoing Plans
              </div>
              <div className="mt-4">{renderTasks(todayTasks, "ongoing")}</div>
            </div>
          </div>
          <div className="col-md-4 d-flex" style={upcomingMain}>
            <div style={headingcss}>
              <div className="text-center" style={upcomingSub}>
                Upcoming Plans
              </div>
              <div className="mt-4">{renderTasks(upcomingTasks, "plan")}</div>
            </div>
          </div>
          <div className="col-md-4 d-flex" style={finishedMain}>
            <div style={headingcss}>
              <div className="text-center" style={finishedSub}>
                Finished
              </div>
              <div className="mt-4">
                {renderTasks(finishedTasks, "finished")}
              </div>
            </div>
          </div>
          <MyButton />
        </div>
      </DragDropContext>
    </>
  );
}

function MyButton() {
  return (
    <button
      className="btn rounded-circle AddButton" // Updated class name
      id="AddButton"
    >
      <FaPlus />
    </button>
  );
}
