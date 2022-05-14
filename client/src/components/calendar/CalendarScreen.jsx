import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import Navbar from "../ui/Navbar";
import CalendarEvent from "./CalendarEvent";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventClearActive, eventSetActive } from "../../actions/event";
import AddNewBtn from "../ui/AddNewBtn";
import DeleteBtn from "../ui/DeleteBtn";

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const onSelectSlot = (e) => {
    activeEvent && dispatch(eventClearActive());
  };

  // TODO: Select between slots in calendar screen to add event according to selected dates
  return (
    <div className="calendar">
      <Navbar />
      <div className="calendar__container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          // eventPropGetter={eventPropGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
          onSelectSlot={onSelectSlot}
          selectable={true}
          view={lastView}
          components={{ event: CalendarEvent }}
        />
      </div>
      {activeEvent && <DeleteBtn />}
      <AddNewBtn />
      <CalendarModal />
    </div>
  );
};
export default CalendarScreen;
