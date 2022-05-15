const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  start: {
    type: Date,
    required: [true, "Start date is required"],
  },
  end: {
    type: Date,
    required: [true, "End date is required"],
  },
  notes: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

EventSchema.methods.toJSON = function () {
  const { __v, ...event } = this.toObject();
  return event;
};

module.exports = model("Event", EventSchema);
