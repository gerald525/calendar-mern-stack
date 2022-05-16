const Event = require("../models/Event");
const User = require("../models/User");

const eventExistsById = async (req, res, next) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({
      ok: false,
      msg: "Event id does not exist",
    });
  }

  next();
};

const isEventOwner = async (req, res, next) => {
  const userId = req.id;
  if (!userId) {
    return res.status(500).json({
      ok: false,
      msg: "Can't validate role if token is not validated.",
    });
  }
  const eventId = req.params.id;
  const event = await Event.findById(eventId);

  if (event.user.toString() !== userId) {
    return res.status(401).json({
      ok: false,
      msg: "Insufficient privileges",
    });
  }

  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      ok: false,
      msg: "Email already exists",
    });
  }

  next();
};

module.exports = {
  eventExistsById,
  isEventOwner,
  emailExists,
};
