const Event = require("../models/Event");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");

    return res.json({
      ok: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const createEvent = async (req, res) => {
  const { title, start, end } = req.body;

  const event = new Event(req.body);
  event.user = req.id;

  try {
    await event.save();

    return res.status(201).json({
      ok: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;
  const { title, start, end, notes } = req.body;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event id does not exists",
      });
    }

    if (event.user.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "Insufficient privileges",
      });
    }

    const newEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        start,
        end,
        notes,
      },
      { new: true }
    );

    return res.json({ ok: true, event: newEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.id;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event id does not exists",
      });
    }

    if (event.user.toString() !== userId) {
      return res.status(401).json({
        ok: false,
        msg: "Insufficient privileges",
      });
    }

    await Event.findByIdAndDelete(id)

    return res.json({ ok: true, event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please, contact the administrator",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
