import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Navbar from "../ui/Navbar";
import "./calendar.css";


const localizer = momentLocalizer(moment);
const events = [];

const CalendarScreen = () => {
    return (
    <div className="calendar">
      <Navbar />
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
};
export default CalendarScreen;
