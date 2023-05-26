import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function NoteChild({ content, idNote }) {
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/notes/${id}`)
      .then((res) => {
        if (res.data.status === "OK") {
          // loadData();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="note">
        <div className="content-child">{content}</div>
        <div className="delete">
          <i
            className="fa-solid fa-trash-can"
            onClick={() => handleDelete(idNote)}
          ></i>
        </div>
      </div>
    </>
  );
}

export default NoteChild;
