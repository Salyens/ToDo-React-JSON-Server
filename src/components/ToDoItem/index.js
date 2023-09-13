import "./todoitem.css";
import ApiService from "../../services/ApiService";

const ToDoItem = ({todo}) => {
  const apiService = new ApiService();
  return (
    <li>
      <div className="edit-delete">
        <span className="edit-icon">
          <i className="fa fa-edit"></i>
        </span>
        <span onClick={() => apiService.delete(todo.id)} className="delete-icon">
          <i className="fa fa-trash-o"></i>
        </span>
      </div>
      <input className="to-do-text" value={todo.text} disabled/>
      <div className="done">
        <i className="fa fa-check-circle"></i>
      </div>
    </li>
  );
};

export default ToDoItem;
