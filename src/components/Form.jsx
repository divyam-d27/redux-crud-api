import { useEffect, useState } from "react";
import { createTodo, updateTodo } from "../provider/context/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();

  const { edit } = useSelector((state) => state.todos);

  const { title, description } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit.isEditing) {
      dispatch(updateTodo({ ...edit.todo, ...formData }));
    } else {
      dispatch(createTodo(formData));
    }
    setFormData({ title: "", description: "" });
  };

  useEffect(() => {
    if (edit.isEditing) {
      setFormData({
        title: edit.todo.title,
        description: edit.todo.description,
      });
    }
  }, [edit]);

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <input
        placeholder="Enter Title"
        type="text"
        className="form-control rounded-0 my-2"
        required
        value={title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Enter Description"
        type="text"
        className="form-control rounded-0 my-2"
        required
        value={description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>

      <button
        className="btn btn-dark rounded-0 my-2 w-100"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
