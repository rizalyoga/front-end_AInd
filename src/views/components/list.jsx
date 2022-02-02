import bin from "../assets/bin.png";
import done from "../assets/check.png";
import unDone from "../assets/close.png";
import edit from "../assets/refresh.png";
import { DeleteTodo, UpdateTodo } from "../scripts/api.js";
import swal from "sweetalert2";

const ListTodo = (props) => {
  let todos = props.todos;

  /* ------------------------------- DELETE TODO ------------------------------ */

  const deleteTodo = (id) => {
    swal
      .fire({
        title: "Are you sure to Delete this Todo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          DeleteTodo(id);
        }
      });
  };

  /* ------------------------------- UPDATE TODO ------------------------------ */

  const updTodo = (id, todo, status_todo) => {
    let status = false;

    if (status_todo) {
      status = false;
    } else {
      status = true;
    }
    const data = {
      todo: todo,
      status_todo: status,
    };

    swal
      .fire({
        title: "Are you sure to Change Status this Todo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          UpdateTodo(id, data);
        }
      });
  };

  return (
    <div className="m-4">
      {todos.length === 0 ? (
        <div class="p-4 mb-4 text-center text-sm text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800" role="alert">
          you don't have todo yet.
        </div>
      ) : (
        todos.map((el) => (
          <div className="base-list bg-white justify-between flex" key={el.id}>
            <div className="todo p-4 flex items-center flex-wrap">
              <p>{el.todo}</p>
            </div>
            <div className="container-action flex  ">
              <div className="action w-full flex items-center justify-center flex-wrap">
                <img src={edit} className="px-1 cursor-pointer" alt="change-status-todo" style={{ width: "2.5rem" }} onClick={() => updTodo(el.id, el.todo, el.status_todo)} />
                <img src={bin} className="px-1 cursor-pointer" alt="delete todo" style={{ width: "2.5rem" }} onClick={() => deleteTodo(el.id)} />
              </div>
              {el.status_todo ? (
                <div className="status-todo flex items-center justify-center flex-wrap w-24 text-white font-bold bg-green-500">
                  <img src={done} alt="done" style={{ width: "2rem" }} />
                </div>
              ) : (
                <div className="status-todo flex items-center justify-center flex-wrap w-24 text-white font-bold bg-red-500">
                  <img src={unDone} alt="done" style={{ width: "2rem" }} />
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListTodo;
