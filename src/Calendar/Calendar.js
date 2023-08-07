import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'

const localizer = momentLocalizer(moment)

export default function TaskSnapCalendar(props) {
    const [holidays, setHoliday] = useState([]);
    const HOLIDAY_API_URL = 'https://canada-holidays.ca/api/v1/holidays';
    useEffect(() => {
        fetch(HOLIDAY_API_URL)
            .then(res => res.json())
            .then(data => setHoliday(data.holidays))
    }, [])
    const holidayEvents = [];
    holidays.forEach(holiday => {
        if (holiday.federal) {
            holidayEvents.push({
                title: holiday.nameEn,
                start: moment(holiday.date).toDate(),
                end: moment(holiday.date).toDate(),
                allDay: true,
                type: 'holiday',
                color: '#D71313'
            });
        }
    });

    const tasks = [];
    props.data.forEach(task => {
        tasks.push({
            title: task.title,
            start: moment(task.start).toDate(),
            end: moment(task.due).toDate(),
            allDay: task.due.includes('T') ? false : true,
        })
    });

    const events = [...holidayEvents, ...tasks];
    return <div className='content'>
        <Calendar
            className='main-calendar'
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor={event => event.allDay ? moment(event.end).add(1, 'days').format('YYYY-MM-DD') : event.end}
            showMultiDayTimes={true}
            eventPropGetter={event => {
                const backgroundColor = event.color;
                return { style: { backgroundColor } };
            }}
        />
    </div>
}