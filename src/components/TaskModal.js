import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";

export default function TaskModal(props) {
  const [editedTask, setEditedTask] = useState(props.task);

  var heading = props.mode === "new" ? "Add a new task" : "Edit task";
  var endPoint = props.mode === "new" ? "/create" : "/update/" + editedTask.id;
  var method = props.mode === "new" ? "POST" : "PUT";

  // Object for Select
  var statuses = [
    { value: "plan", label: "Plan" },
    { value: "ongoing", label: "Ongoing" },
    { value: "finished", label: "Finished" },
  ];

  var labels = [
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "meeting", label: "Meeting" },
    { value: "migration", label: "Migration" },
    { value: "planning", label: "Planning" },
    { value: "optimization", label: "Optimization" },
    { value: "review", label: "Review" },
    { value: "testing", label: "Testing" },
    { value: "training", label: "Training" },
    { value: "security", label: "Security" },
  ];

  // Get if it is all day event
  const [allDay, setAllDay] = useState(editedTask.allDay);

  // Get current date and time for default value of start date
  var dateNow = moment().format("YYYY-MM-DD");

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle select change
  const handleStatusChange = (selectedOption) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      status: selectedOption.value,
    }));
  };

  // Handle label change
  const handleLabelChange = (selectedOption) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      label: selectedOption.value,
    }));
  };

  // Handle all day change
  const handleAllDayChange = (e) => {
    setAllDay(e.target.checked);
    setEditedTask((prevTask) => ({
      ...prevTask,
      allDay: e.target.checked,
    }));
  };

  // Handle date and time change
  const handleDateChange = (event) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: moment(event.target.value).format("YYYY-MM-DD"),
    }));
  };

  const handleTimeChange = (event) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [event.target.name]: moment(event.target.value, "h:mm").format(
        "HH:mm:ss"
      ),
    }));
  };

  const handleCloseModalWithChange = () => {
    props.onSave(editedTask);
    console.log(editedTask);
    handleAPI();
    props.onHide();
  };

  const handleAPI = () => {
    fetch(process.env.REACT_APP_API_URL + endPoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="content">
      <Modal show={props.showModal} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* Title */}
            <div className="modal-label-and-input">
              <label for="title" className="modal-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="modal-input-full-width"
                defaultValue={editedTask.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Status */}
            <div className="modal-label-and-input">
              <label for="status" className="modal-label">
                Status
              </label>
              <Select
                className="modal-input-full-width"
                value={statuses.value}
                options={statuses}
                defaultValue={statuses.filter(
                  (status) => status.value === editedTask.status
                )}
                name="status"
                onChange={handleStatusChange}
              />
            </div>

            {/* All day */}
            <div className="modal-label-and-input">
              <input
                type="checkbox"
                id="allDay"
                name="allDay"
                defaultChecked={editedTask.allDay}
                onChange={handleAllDayChange}
              />
              <label for="allDay" style={{ "margin-left": "5px" }}>
                All day event
              </label>
            </div>

            {/* Start date/time */}
            <div>{editedTask.start}</div>
            <div className="modal-label-and-input">
              <label for="start" className="modal-label">
                Start date
              </label>
              {props.mode === "new" ? (
                <input
                  type="date"
                  id="date-start"
                  name="startDate"
                  defaultValue={dateNow}
                  onChange={handleDateChange}
                />
              ) : (
                <input
                  type="date"
                  id="date-start"
                  name="startDate"
                  defaultValue={editedTask.startDate}
                  onChange={handleDateChange}
                />
              )}
              {!allDay && (
                <input
                  type="time"
                  id="time-start"
                  name="startTime"
                  defaultValue={editedTask.startTime}
                  onChange={handleTimeChange}
                />
              )}
            </div>

            {/* End date/time */}
            <div className="modal-label-and-input">
              <label for="due" className="modal-label">
                Due date
              </label>
              <input
                type="date"
                name="dueDate"
                defaultValue={editedTask.dueDate}
                onChange={handleDateChange}
              />
              {!allDay && (
                <input
                  type="time"
                  id="duetime"
                  name="dueTime"
                  defaultValue={editedTask.dueTime}
                  onChange={handleTimeChange}
                />
              )}
            </div>

            {/* Label */}
            <div className="modal-label-and-input">
              <label for="label" className="modal-label">
                Label
              </label>
              <Select
                className="modal-input-full-width"
                value={labels.value}
                options={labels}
                defaultValue={labels.filter(
                  (label) => label.label === editedTask.label
                )}
                name="label"
                onChange={handleLabelChange}
              />
              <br />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModalWithChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
