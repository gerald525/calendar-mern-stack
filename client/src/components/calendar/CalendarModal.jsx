import { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { removeError, setError, uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/event";
import Alert from "../ui/Alert";

Modal.setAppElement("#root");

const nowInitial = moment().minutes(0).seconds(0).add(1, "hour");
const nowEnd = nowInitial.clone().add(1, "hour");

const initEvent = {
  title: "",
  notes: "",
  start: nowInitial.toDate(),
  end: nowEnd.toDate(),
};

const CalendarModal = () => {
  const dispatch = useDispatch();

  const { ui, calendar } = useSelector((state) => state);
  const { modalOpen, msgError } = ui;
  const { activeEvent } = calendar;

  const [formValues, setFormValues] = useState(initEvent);
  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    if (modalOpen) {
      dispatch(eventClearActive());
      dispatch(uiCloseModal());
    }
  };

  const handleStartDateChange = (e) => {
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    if (activeEvent && activeEvent.id) {
      // Update
      dispatch(eventStartUpdate(formValues));
    } else {
      // Create new
      dispatch(eventStartAddNew(formValues));
    }

    closeModal();
  };

  const isFormValid = () => {
    if (title.trim().length === 0) {
      dispatch(setError("Title is required"));
      return false;
    } else if (title.trim().length > 32) {
      dispatch(setError("Title length must be max 32 characters"));
      return false;
    } else if (moment(start).isSameOrAfter(moment(end))) {
      dispatch(setError("End date must be after start date"));
      return false;
    } else if (notes && notes.trim().length > 128) {
      dispatch(setError("Notes length must be max 128 characters"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      contentLabel="Event modal"
      className="modal"
      overlayClassName="modal__background"
    >
      <h1 className="modal__title">
        {activeEvent ? "Edit event" : "New event"}
      </h1>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        {msgError && <Alert type="error" description={msgError} />}
        <div className="form__field">
          <label className="form__label">Start date</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={start}
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label className="form__label">End date</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={end}
            minDate={start}
            className="form__input"
          />
        </div>
        <hr />
        <div className="form__field">
          <label htmlFor="title" className="form__label">
            Event title
          </label>
          <input
            autoComplete="off"
            type="text"
            className="form__input"
            id="title"
            name="title"
            placeholder="New event"
            value={title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form__field">
          <label htmlFor="notes" className="form__label">
            Notes
          </label>
          <textarea
            type="text"
            className="form__text-area"
            rows="5"
            id="notes"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="btn btn-primary btn--block" type="submit">
          Save
        </button>
      </form>
    </Modal>
  );
};
export default CalendarModal;
