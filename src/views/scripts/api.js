import axios from "axios";
import swal from "sweetalert2";
// import { useState } from "react";

export const AddTodo = (data) => {
  axios
    .post("http://localhost:5000/todolist/", data)
    .then((response) => {
      swal.fire({ icon: "success", text: `${response.data.message}` });
    })
    .catch((err) => {
      swal.fire({ icon: "err", text: `${err.response.message}` });
    });
};

export const DeleteTodo = (id) => {
  axios
    .delete(`http://localhost:5000/todolist/${id}`)
    .then((response) => {
      swal.fire({ icon: "success", text: `${response.data.message}` });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UpdateTodo = (id, data) => {
  axios
    .patch(`http://localhost:5000/todolist/${id}`, data)
    .then((response) => {
      swal.fire({ icon: "success", text: `${response.data.message}` });
    })
    .catch((err) => {
      console.log(err);
    });
};
