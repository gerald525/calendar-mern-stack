import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import CalendarModal from "./CalendarModal";
import { useDispatch } from "react-redux";
import { uiOpenModal } from "../../actions/ui";

const localizer = momentLocalizer(moment);
const events = [
  {
    title: "Happy birthday",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    notes: "Buy cake",
    user: {
      _id: "123",
      name: "Juan",
    },
  },
];

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal())
  };

  const onSelect = (e) => {
    console.log(e);
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "darkcyan",
      opacity: 0.9,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar">
      <Navbar />
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          view={lastView}
          components={{ event: CalendarEvent }}
        />
      </div>
      <CalendarModal />
    </div>
  );
};
export default CalendarScreen;
