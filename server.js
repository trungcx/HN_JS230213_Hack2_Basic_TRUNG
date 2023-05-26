const express = require("express");
const server = express();
const port = 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const validateData = require("./middleware/checkValidate");

// USE
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static("public"));
server.use(cors());

const database = require("./utils/database");

server.get("/api/v1/notes", (req, res) => {
  const queryString = "SELECT * FROM module3_hack.notekeeper";
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "read all OK",
        data: result,
      });
    }
  });
});
server.get("/api/v1/notes/:id", (req, res) => {
  const { id } = req.params;
  //   const queryString = `INSERT INTO notekeeper (content) VALUES ("just content")`;
  const queryString = `SELECT * FROM module3_hack.notekeeper WHERE note_id=${id}`;
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   let notes = JSON.parse(result);
      console.log("result", result);
      return res.status(200).json({
        status: "Read one OK",
        data: result,
      });
    }
  });
});
// insert row
server.post("/api/v1/notes", validateData, (req, res) => {
  const { Content } = req.body;
  const queryString = `INSERT INTO notekeeper (content) VALUES (?)`;
  database.query(queryString, Content, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   console.log("result", result);
      return res.status(200).json({
        status: "add OK",
        data: result,
      });
    }
  });
});
// Delete row
server.delete("/api/v1/notes/:id", (req, res) => {
  const { id } = req.params;
  const queryString = `DELETE FROM notekeeper where note_id=${id}`;
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      //   let notes = JSON.parse(result);
      console.log("result", result);
      return res.status(200).json({
        status: "delete one OK",
        data: result,
      });
    }
  });
});

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
