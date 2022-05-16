const Event = require("../models/Event");

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

module.exports = {
  eventExistsById,
  isEventOwner,
};
