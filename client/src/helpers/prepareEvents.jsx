import moment from "moment";

export const prepareEvents = (events = []) => {
  return events.map((e) => {
    let { _id: id, ...event } = e;
    return {
      ...event,
      id,
      start: moment(e.start).toDate(),
      end: moment(e.end).toDate(),
    };
  });
};
