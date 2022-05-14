import { useDispatch } from "react-redux";
import { eventDelete } from "../../actions/event";
import DeleteIcon from "./icons/DeleteIcon";

const DeleteBtn = () => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    dispatch(eventDelete());
  };

  return (
    <button
      className="btn btn-primary btn--floating btn--floating-left"
      onClick={handleClickDelete}
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteBtn;
