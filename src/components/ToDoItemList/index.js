import ToDoItem from "../ToDoItem";

const ToDoItemList = ({ todos }) => {
  if (!todos.length) return "loading...";
  const toDoList = todos.map((todo) => (
    <ToDoItem todo={todo} key={`toDoItem-${todo.id}`} />
  ));
  return <ul>{toDoList}</ul>;
};
export default ToDoItemList;
