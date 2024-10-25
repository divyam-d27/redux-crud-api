import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, edit, removeTodo } from "../provider/context/todoSlice";

const ListItem = ({ todo }) => {
  const dispatch = useDispatch();

  const { isSuccess } = useSelector((state) => state.todos);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    isSuccess && dispatch(removeTodo(id));
  };

  const handleEdit = () => {
    dispatch(edit(todo));
  };

  return (
    <li className="list-group-item rounded-0 my-1">
      <h1>Title : {todo.title}</h1>
      <p className="text-secondary">Description : {todo.description}</p>

      <span className="float-end">
        <button
          onClick={handleEdit}
          className="btn btn-sm btn-outline-warning mx-1"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(todo._id)}
          className="btn btn-sm btn-outline-danger"
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default ListItem;
