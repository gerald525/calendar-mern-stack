const moment = require("moment");

const isDate = (value) => {
  if (!value) {
    return false;
  }

  const date = moment(value, true);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

const isDateAfter = (end, start) => {
  if (moment(start).isSameOrAfter(moment(end))) {
    return false;
  }
  return true;
};

module.exports = {
  isDate,
  isDateAfter,
};
