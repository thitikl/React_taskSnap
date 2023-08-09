import { FaPlus } from "react-icons/fa";

export default function Board(props) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return ""; // Invalid date format
    }

    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12; // Midnight
    }

    const formattedTime =
      hours !== 0 || minutes !== 0
        ? `${hours}:${minutes.toString().padStart(2, "0")}${ampm}`
        : "11:59pm";

    return `${formattedDate} [${formattedTime}]`;
  }

  const { data: tasksData } = props;
  const renderTasks = (tasks) => {
    return tasks.length > 0 ? (
      tasks.map((task) => (
        <div
          className="tasks"
          style={{ cursor: "pointer" }}
          key={task.id}
          onClick={() => alert("Task Edit Pop Will Be here")}
        >
          <div className="container">
            <p>
              <span style={{ color: "#f9eaea", fontSize: "18px" }}>
                <strong>{task.title}</strong>
                <br />
              </span>
              <span style={{ color: "silver", fontSize: "14px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-tags-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                </svg>{" "}
                {task.label}
              </span>
              <br />
              <span style={{ color: "#ededed", fontSize: "14px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar-event-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z" />
                </svg>
                <span> </span>
                {formatDate(task.due)}
              </span>
              <br />
              <span style={{ color: "#ededed", fontSize: "14px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-double-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>{" "}
                {task.assigned_to}
              </span>
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No tasks for this status</p>
    );
  };
  const upcomingTasks = tasksData.filter((task) => task.status === "plan");
  const todayTasks = tasksData.filter((task) => task.status === "ongoing");
  const finishedTasks = tasksData.filter((task) => task.status === "finished");

  return (
    <>
      <div className="container-fluid d-flex vh-100 bg-dark ">
        <div
          className="fixed-width-sidebar bg-black"
          style={{ width: "240px" }}
        ></div>
        <div className="row align-items-stretch w-100">
          <div
            className="col-md-4 bg-primary d-flex boarddata"
            style={{
              overflowY: "auto",
              maxHeight: "100%",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div
              style={{
                height: "60px",
                marginTop: "10px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                className="text-center"
                style={{
                  backgroundColor: "rgb(211, 229, 239)",
                  color: "rgb(24, 51, 71)",
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  padding: "10px",
                  borderRadius: "10%",
                }}
              >
                Ongoing Plans
              </div>
              <div className="mt-4">
                {renderTasks(todayTasks)}
                <button
                  className="btn rounded-circle"
                  style={{
                    fontSize: "30px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    marginBottom: "10px",
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 bg-secondary d-flex"
            style={{
              overflowY: "auto",
              maxHeight: "100%",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div
              style={{
                height: "60px",
                marginTop: "10px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                className="text-center"
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  padding: "10px",
                  borderRadius: "10%",
                  color: "rgb(65, 36, 84)",
                  backgroundColor: "rgb(232, 222, 238)",
                }}
              >
                Upcoming Plans
              </div>
              <div className="mt-4">
                {renderTasks(upcomingTasks)}
                <button
                  className="btn rounded-circle"
                  style={{
                    fontSize: "30px",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    marginBottom: "10px",
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 bg-success d-flex"
            style={{
              overflowY: "auto",
              maxHeight: "100%",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <div
              style={{
                height: "60px",
                marginTop: "10px",
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div
                className="text-center"
                style={{
                  fontSize: "20px",
                  fontFamily: "sans-serif",
                  color: "rgb(28, 56, 41)",
                  backgroundColor: "rgb(219, 237, 219)",
                  padding: "10px",
                  borderRadius: "10%",
                }}
              >
                Finished
              </div>
              <div className="mt-4">{renderTasks(finishedTasks)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
