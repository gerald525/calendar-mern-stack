/*
  Events routes -> /api/events
*/

const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { eventExistsById, isEventOwner } = require("../helpers/databaseValidators");
const { isDate } = require("../helpers/isDate");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJwt");

const router = Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("id", "Invalid event ID.").isMongoId(),
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  updateEvent
);

router.delete(
  "/:id",
  [
    check("id", "Invalid event ID.").isMongoId(),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

module.exports = router;
