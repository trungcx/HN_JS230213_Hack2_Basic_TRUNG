import logo from "./logo.svg";
import "./App.css";
import NoteChild from "./components/NoteChild";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // STATE
  const [content, setContent] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [del, setDel] = useState(false);

  const test = "send props";
  // Gọi api hiển thị danh sách feedback
  const loadData = async () => {
    setShowLoading(true);
    await axios
      .get("http://localhost:3000/api/v1/notes")
      .then((res) => {
        setNotes(res.data.data);

        // console.log("data", res.data.data);
        // setFeedbacks(res.data);
        // setTotalFeedback(res.data.data.length);
      })
      .catch((err) => console.log(err));
    setShowLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadData();
  }, del);
  // Add new note
  const handleAddNote = () => {
    console.log("add :", content);
    axios
      .post("http://localhost:3000/api/v1/notes", { Content: content })
      .then((res) => {
        // console.log(res.data.data);
        setContent("");
        loadData();
      })
      .catch((err) => console.log(err));
  };
  // Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/notes/${id}`)
      .then((res) => {
        if (res.data.status) {
          loadData();
          setTimeout(() => {
            // setShowDialogSuccess(true);
          }, 200);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div className="nav">Note App</div>
      <div className="add-note">
        <input type="text" className="title" placeholder="Title" />
        <textarea
          type="text"
          className="content"
          value={content}
          onChange={(e) => {
            // console.log(e.target.value);
            setContent(e.target.value);
          }}
          placeholder="Take a note..."
        />
        <div className="add-btn" onClick={handleAddNote}>
          Add note
        </div>
      </div>
      <div className="note-container">
        {notes.map((note, index) => (
          <>
            {/* <NoteChild content={note.content} idNote={note.note_id} /> */}
            <div className="note">
              <div className="content-child">{note.content}</div>
              <div className="delete">
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => {
                    setDel(!del);
                    handleDelete(note.note_id);
                  }}
                ></i>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
