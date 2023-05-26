import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = () => {

    const events = [
        { title: 'event 1', date: '2023-06-01' },
        { title: 'event 2', date: '2023-06-02' }
    ];

    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            events={events}
        />
    );
}

export default Calendar;