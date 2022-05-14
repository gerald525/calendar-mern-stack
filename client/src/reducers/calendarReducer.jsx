import moment from "moment";
import types from "../types";

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: "Happy birthday",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      notes: "Buy cake",
      user: {
        _id: "123",
        name: "Juan",
      },
    },
  ],
  activeEvent: null,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null,
      };

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case types.eventUpdate:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };

    case types.eventDelete:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== state.activeEvent.id),
        activeEvent: null,
      };

    default:
      return state;
  }
};

export default calendarReducer;
