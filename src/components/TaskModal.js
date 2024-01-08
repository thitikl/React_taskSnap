import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useState } from "react";
import Select from "react-select";

export default function TaskModal(props) {
  const [editedTask, setEditedTask] = useState(props.task);

  var heading = props.mode === "new" ? "Add a new task" : "Edit task";
  // Object for Select
  var statuses = [
    { value: "plan", label: "Plan" },
    { value: "ongoing", label: "Ongoing" },
    { value: "finished", label: "Finished" },
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
  const handleSelectChange = (selectedOption) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      status: selectedOption.value,
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
    props.onHide();
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
                  (status) => status.value == editedTask.status
                )}
                name="status"
                onChange={handleSelectChange}
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
              {props.mode == "new" ? (
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

            {/* Assigned to */}
            <div className="modal-label-and-input">
              <label for="assigned_to" className="modal-label">
                Assigned to
              </label>
              <input
                type="text"
                name="assignedTo"
                id="assignedTo"
                className="modal-input-full-width"
                defaultValue={editedTask.assignedTo}
                onChange={handleInputChange}
              />
              <br />
            </div>

            {/* Label */}
            <div className="modal-label-and-input">
              <label for="label" className="modal-label">
                Label
              </label>
              <input
                type="text"
                name="label"
                id="label"
                className="modal-input-full-width"
                defaultValue={editedTask.label}
                onChange={handleInputChange}
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
