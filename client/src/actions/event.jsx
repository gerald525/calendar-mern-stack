import types from "../types";

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventDelete = (id) => ({
  type: types.eventDelete,
  payload: id,
});
