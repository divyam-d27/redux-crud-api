import { useDispatch, useSelector } from "react-redux";
import ListItem from "./ListItem";
import { useEffect } from "react";
import { getTodos } from "../provider/context/todoSlice";

const ListGroup = () => {
  const dispatch = useDispatch();

  const { allTodos, isLoading, isError } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  if (isLoading) {
    return (
      <h1 className="my-3 text-center display-6 text-secondary">Loading...</h1>
    );
  }
  if (isError) {
    return (
      <h1 className="my-3 text-center display-6 text-danger">
        Something Went Wrong...
      </h1>
    );
  }

  if (allTodos.length === 0) {
    return (
      <h1 className="my-3 text-center display-6 text-secondary">
        No Todos Yet...
      </h1>
    );
  }

  return (
    <ul className="list-group my-3">
      {allTodos.map((todo) => (
        <ListItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default ListGroup;
