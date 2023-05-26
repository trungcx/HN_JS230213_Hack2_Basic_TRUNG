import React from "react";

function NoteChild({ test }) {
  return (
    <>
      <div className="note">
        <div className="content-child">{test}</div>
        <div className="delete">
          <i className="fa-solid fa-trash-can"></i>
        </div>
      </div>
    </>
  );
}

export default NoteChild;
