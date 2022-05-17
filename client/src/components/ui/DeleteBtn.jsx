import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eventStartDelete } from "../../actions/event";
import DeleteIcon from "./icons/DeleteIcon";

const DeleteBtn = () => {
  const dispatch = useDispatch();

  const handleClickDelete = () => {
    Swal.fire({
      title: "Delete event",
      text: "Do you want to delete the selected event?",
      icon: "warning",
      confirmButtonText: "Yes, delete!",
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) dispatch(eventStartDelete());
    });
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
