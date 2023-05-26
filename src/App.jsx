import logo from "./logo.svg";
import "./App.css";
import NoteChild from "./components/NoteChild";

function App() {
  const test = "send props";
  return (
    <div className="App">
      <div className="nav">Note App</div>
      <div className="add-note">
        <input type="text" className="title" placeholder="Title" />
        <textarea
          type="text"
          className="content"
          placeholder="Take a note..."
        />
        <div className="add-btn">Add note</div>
      </div>
      <div className="note-container">
        <NoteChild test={test} />
      </div>
    </div>
  );
}

export default App;
