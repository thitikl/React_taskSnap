import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function TaskSnapCalendar(props) {
  const [holidays, setHoliday] = useState([]);
  const HOLIDAY_API_URL = "https://canada-holidays.ca/api/v1/holidays";

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  // Fetching holiday data from API
  useEffect(() => {
    fetch(HOLIDAY_API_URL)
      .then((res) => res.json())
      .then((data) => setHoliday(data.holidays));
  }, []);
  const holidayEvents = [];
  holidays.forEach((holiday) => {
    if (holiday.federal) {
      holidayEvents.push({
        title: holiday.nameEn,
        start: moment(holiday.date).toDate(),
        end: moment(holiday.date).toDate(),
        allDay: true,
        type: "holiday",
        color: "#B42B51",
      });
    }
  });

  // Fetching event data from props
  const [tasks, setTasks] = useState([]);
  function taskToEvent(task) {
    return {
      title: task.title,
      start: moment(task.startDate).toDate(),
      end: moment(task.dueDate).toDate(),
      allDay: task.allDay,
    };
  }
  const newTasks = data
    .filter((data) => data.status === "ongoing")
    .map(taskToEvent);
  useEffect(() => {
    setTasks(newTasks);
  }, []);

  // Combine data from API and props
  const events = [...holidayEvents, ...tasks];

  return (
    <div className="content" id="calendar">
      <Calendar
        className="main-calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor={(event) =>
          event.allDay
            ? moment(event.end).add(1, "days").format("YYYY-MM-DD")
            : event.end
        }
        showMultiDayTimes={true}
        eventPropGetter={(event) => {
          const backgroundColor = event.color;
          return { style: { backgroundColor } };
        }}
      />
    </div>
  );
}
