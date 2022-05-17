import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/event";
import { uiOpenModal } from "../../actions/ui";
import PlusIcon from "./icons/PlusIcon";

const AddNewBtn = () => {
  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(eventClearActive());
    dispatch(uiOpenModal());
  };

  return (
    <button className="btn btn-primary btn--floating btn--floating-right" onClick={handleClickNew}>
      <PlusIcon />
    </button>
  );
};
export default AddNewBtn;
