import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useState } from "react";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#root");

const nowInitial = moment().minutes(0).seconds(0).add(1, "hour");
const nowFinal = nowInitial.clone().add(1, "hour");

const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);

  const [startDate, setStartDate] = useState(nowInitial.toDate());
  const [finalDate, setFinalDate] = useState(nowFinal.toDate());

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: nowInitial.toDate(),
    end: nowFinal.toDate(),
  });

  const { notes, title, start, end } = formValues;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    if (modalOpen) dispatch(uiCloseModal());
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleFinalDateChange = (e) => {
    setFinalDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire("Error", "Final date must be after initial date", "error");
    }

    if (title.trim().length < 2) {
      Swal.fire("Error", "Title length must be at least 2", "error");
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
      <h1 className="modal__title">New event</h1>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label className="form__label">Start date</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form__input"
          />
        </div>
        <div className="form__field">
          <label className="form__label">Final date</label>
          <DateTimePicker
            onChange={handleFinalDateChange}
            value={finalDate}
            minDate={startDate}
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
