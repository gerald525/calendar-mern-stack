import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import types from "../types";

export const eventStartLoading = () => {
  return async (dispatch) => {
    fetchWithToken("events")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          const events = prepareEvents(data.events);
          dispatch(eventLoaded(events));
        } else {
          if (data.msg) Swal.fire("Error", data.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { id: _id, name } = getState().auth;

    fetchWithToken("events", event, "POST")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          event.id = data.event._id;
          event.user = {
            _id,
            name,
          };
          dispatch(eventAddNew(event));
          Swal.fire(
            "Saved",
            `'${event.title}' has been saved successfully.`,
            "success"
          );
        } else {
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    fetchWithToken(`events/${event.id}`, event, "PUT")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          dispatch(eventUpdate(event));
          Swal.fire(
            "Updated",
            `'${event.title}' has been updated successfully.`,
            "success"
          );
        } else {
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    fetchWithToken(`events/${id}`, {}, "DELETE")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          dispatch(eventDelete(id));
          Swal.fire(
            "Deleted",
            `The event has been deleted successfully.`,
            "success"
          );
        } else {
          const msgError =
            data.msg ||
            data.errors[Object.keys(data.errors)[0]].msg ||
            "Please, contact the administrator";
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

const eventDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});

export const eventLogout = () => ({
  type: types.eventClearLogout,
});
