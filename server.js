const fs = require("fs");
const express = require("express");
const path = require("path");
const notesRouter = require("./routes/notes");

const app = express();

const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/notes", notesRouter);

// GET request for notes
app.get("/notes", (req, res) => {
  // Log our request to the terminal
  console.info(`${req.method} request received to get notes`);

  // Send a message to the client
  res.sendFile(path.resolve(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
