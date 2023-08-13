import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { finishedMain, finishedSub, upcomingMain, upcomingSub, ongoingMain, ongoingSub, headingcss, taskDescription } from "./BoardStyles";
import { formatDate } from "./DateFormat";
import { resetServerContext } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";

export default function Board(props) {
  const { data: tasksData } = props;

  // Function to fetch tasks from local storage
  const fetchTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      localStorage.setItem("tasks", JSON.stringify(tasksData)); // tasksData is your default array of objects
      return tasksData; // Return the default tasks
    }
  };
  
  const initialTasks = fetchTasksFromLocalStorage();
  const [showDialog, setShowDialog] = useState(false);
  // You can use this function to initialize your tasks state:
  // And then use `initialTasks` in your useState hook:
  const [tasks, setTasks] = useState(initialTasks);

  const handleAddButtonClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const [newTask, setNewTask] = useState({
    title: "",
    start: "",
    due: "",
    assigned_to: "",
    label: "",
    description: "",
  });

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = () => {
    const newID = `task-${tasks.length}`; // Generate new unique ID
    newTask.id = newID;
    newTask.status = "plan"; // Default status
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to local storage
    setShowDialog(false);
    setNewTask({
      title: "",
      start: "",
      due: "",
      assigned_to: "",
      label: "",
      description: "",
    }); // Clear the inputs
    toast.success('New Plan, Successfully ADDED 😎', 
    {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
    )
  };

  function MyButton() {
    return (
      <button
        className="btn rounded-circle AddButton bg-primary" // Updated class name
        id="AddButton"
        onClick={handleAddButtonClick}
      >
        <FaPlus />
      </button>
    );
  }

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
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success('Plan Moved Successfully 😎', 
    {
      icon: '👏',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    }
    )
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
                      <p className="datadisplay">
                        <span style={{ fontSize: "18px" }}>
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
                        <span style={{ fontSize: "14px" }}>
                          <i className="bi bi-calendar3-event-fill"></i>
                          <span> </span>
                          {formatDate(task.due)}
                        </span>
                        <br />
                        <span style={{ color: "brown", fontSize: "13px" }}>
                          <i className="bi bi-tags-fill"></i> {task.label}
                        </span>
                        <span style={{ fontSize: "14px" }}>
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
              <div className="mt-4 text-dark">
                {renderTasks(todayTasks, "ongoing")}
              </div>
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
        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h3 className="text-center mb-2 bg-info p-3 rounded">
                Add New Task
              </h3>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Plan Name:{" "}
                </span>
                <input
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Category:{" "}
                </span>
                <input
                  name="label"
                  type="text"
                  className="form-control"
                  placeholder="Assigned to"
                  aria-label="Server"
                  value={newTask.label}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Description:{" "}
                </span>
                <input
                  name="description"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  aria-label="Server"
                  value={newTask.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Member:{" "}
                </span>
                <input
                  name="assigned_to"
                  type="text"
                  className="form-control"
                  placeholder="Category"
                  aria-label="Server"
                  value={newTask.assigned_to}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Start Date:{" "}
                </span>
                <input
                  name="start"
                  type="date"
                  className="form-control"
                  placeholder="Start Date"
                  aria-label="Username"
                  value={newTask.start}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group mb-2">
                <span className="input-group-text" style={{ width: "120px" }}>
                  Due Date:{" "}
                </span>
                <input
                  name="due"
                  type="date"
                  className="form-control"
                  placeholder="Due Date"
                  aria-label="Server"
                  value={newTask.due}
                  onChange={handleInputChange}
                />
              </div>

              <br />
              <center>
                <button
                  className="btn btn-primary me-3"
                  onClick={handleAddTask}
                  disabled={newTask.title.length < 3 || newTask.assigned_to.length < 2 || newTask.label.length < 1 || !newTask.start || !newTask.due}
                  >
                  Add Task
                </button>
                <button
                  className="btn btn-secondary me-3"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
              </center>
            </div>
          </div>
        )}
      </DragDropContext>
    </>
  );
}
