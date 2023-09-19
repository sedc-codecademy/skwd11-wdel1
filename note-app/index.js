import express from "express";
import { DataService } from "./data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const PORT = 3000;

// This is how it's done right now, simply copy if you want to use
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const NOTES_PATH = path.join(__dirname, "data", "db.json");

const app = express();

// Allows expres to parse json in request body
app.use(express.json());

// 1. Get all notes
app.get("/notes", async (req, res) => {
  try {
    const notesData = await DataService.readJSONFile(NOTES_PATH);

    return res.json(notesData);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
});
// 2. Create a note
app.post("/notes", async (req, res) => {
  try {
    // Create new note
    const { title, body } = req.body;

    const newNote = {
      id: uuid(),
      title,
      body,
    };

    // Read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);

    // Add note to existing note array
    const updatedNotes = [...notes, newNote];

    // Save notes
    await DataService.writeJSONFile(NOTES_PATH, updatedNotes);

    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
});
// 3. Get note by id
app.get("/notes/:id", async (req, res) => {
  try {
    // Extract id
    const noteId = req.params.id;

    console.log(noteId);
    // Read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    // Find note by id in notes
    const foundNote = notes.find(note => note.id === noteId);

    if (!foundNote) throw new Error();

    // Return note
    return res.status(200).json(foundNote);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: "Note not found" });
  }
});

// 4. Update note
app.put("/notes/:id", async (req, res) => {
  try {
    // extract id and req body
    const noteId = req.params.id;
    const noteUpdates = req.body;
    // read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);
    // find note in notes
    const foundNote = notes.find(note => note.id === noteId);

    if (!foundNote) throw new Error();

    // update notes with update note
    const updatedNote = { ...foundNote, ...noteUpdates };

    const updatedNotes = notes.map(note =>
      note.id === updatedNote.id ? updatedNote : note
    );

    // save notes
    await DataService.writeJSONFile(NOTES_PATH, updatedNotes);

    // return updated note
    return res.json(updatedNote);
  } catch (error) {
    return res.status(400).json({ msg: "Couldn't update note" });
  }
});
// 5. Delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    // extract id
    const noteId = req.params.id;
    // read notes
    const notes = await DataService.readJSONFile(NOTES_PATH);

    // delete note
    const updatedNotes = notes.filter(note => note.id !== noteId);

    if (updatedNotes.length === notes.length) throw new Error();

    // save notes
    await DataService.writeJSONFile(NOTES_PATH, updatedNotes);

    // return success response

    // res.sendStatus(200);
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ msg: "Note not found" });
  }
});

app.get("/", (req, res) => {
  //   Sends response data back to the client
  res.send("Welcome to the notes api");
});

app.all("*", (req, res) => {
  res.status(404).send("Error 404! Requested content doesn't exist");
});

app.listen(PORT, () => {
  console.log("Server is up at port 3000");
});
