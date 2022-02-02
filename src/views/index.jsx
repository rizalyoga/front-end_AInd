import { useState, useEffect } from "react";
import "./index.css";
import ListTodo from "./components/list.jsx";
import axios from "axios";
import { AddTodo } from "./scripts/api.js";

const HomePage = () => {
  const [todoList, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  /* ------------------------------ GET ALL DATA ------------------------------ */
  const GetAllData = async () => {
    await axios
      .get("http://localhost:5000/todolist/")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetAllData();
  }, []);

  useEffect(() => {
    setInterval(() => {
      GetAllData();
    }, 3000);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    const data = {
      todo: todo,
      status_todo: false,
    };
    setTodo("");
    AddTodo(data);
  };

  return (
    <>
      <div className="base-content flex justify-center w-full">
        <div className="container ">
          <h1 className="text-center pt-10 font-bold text-white text-3xl">Todo List App</h1>
          <div className="base-form flex justify-center item-center pt-10">
            <form onSubmit={addTodo} className="m-4 flex justify-center w-full">
              <input className="focus:outline-none p-4 border-t mr-0 border-b text-gray-800 border-gray-200 bg-white w-full text-center" required placeholder="Type Your Todo" value={todo} onChange={(event) => setTodo(event.target.value)} />
              <button className="focus:outline-none hover:bg-green-100 hover:border-green-100 px-8  bg-yellow-400  text-gray-700 font-bold p-4 border-yellow-500 border-t border-b border-r">Add</button>
            </form>
          </div>
          <ListTodo todos={todoList} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
