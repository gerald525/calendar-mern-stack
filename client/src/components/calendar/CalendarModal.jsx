import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddNew,
  eventClearActive,
  eventUpdate,
} from "../../actions/event";

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
  const { modalOpen } = ui;
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
      setTimeout(() => {
        dispatch(eventClearActive());
        setFormValues(initEvent);
      }, 200);
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

    if (moment(start).isSameOrAfter(moment(end))) {
      Swal.fire("Error", "End date must be after start date", "error");
      return;
    }

    if (title.trim().length < 2) {
      Swal.fire("Error", "Title length must be at least 2", "error");
      return;
    }

    if (activeEvent) {
      // Update
      dispatch(eventUpdate(formValues));
    } else {
      // Create new
      dispatch(
        eventAddNew({
          ...formValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "Juan",
          },
        })
      );
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal__background"
    >
      <h1 className="modal__title">
        {activeEvent ? "Edit event" : "New event"}
      </h1>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
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
