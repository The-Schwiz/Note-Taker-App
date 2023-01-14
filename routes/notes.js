const express = require("express");
const path = require("path");
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

const router = express.Router();

// GET request to view all saved notes
router.get("/", async (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to view all saved notes`);
  try {
    const data = await readFromFile(
      path.resolve(__dirname, "../Develop/db/db.json")
    );
    res.status(200).json(JSON.parse(data));
  } catch (err) {
    console.log(err);
    res.status(500).json("Error in getting notes");
  }
});

// POST request to receive a new note to save on the request body
router.post("/", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to view all saved notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    const absolutePath = path.resolve(__dirname, "../Develop/db/db.json");
    readAndAppend(newNote, absolutePath);

    const response = {
      status: "success",
      body: newNote,
    };

    res.status(201).json(response);
  } else {
    res.status(400).json("Error: title and text should be present in req body");
  }
});

module.exports = router;
