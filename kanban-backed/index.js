const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();
app.use(cors());
app.use(express.json());
const connectToDB = require("./db");

const Team = require("./models/team");

app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find(); // Retrieve all teams from the database
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving teams" });
  }
});

app.post("/teams", async (req, res) => {
  try {
    const { title, description, boards } = req.body;
    const team = new Team({
      id: uuidv4(), // Generate a new UUID for the team
      title: title,
      description: description,
      boards: boards,
      created_date: new Date(),
      updated_date: new Date(),
    });
    const savedTeam = await team.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    console.log("Error");
    res.status(500).json({ error: "Error creating a team" });
  }
});

// Update a team by ID
app.put("/teams/:id", async (req, res) => {
  try {
    const { title, description, boards, _id } = req.body;
    console.log(req.body);
    // Find the document by ID
    const team = await Team.findOne({ _id: _id });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Update the document properties
    team.title = title;
    team.description = description;
    team.boards = boards;
    team.updated_date = new Date();

    // Save the updated document
    const updatedTeam = await team.save();

    res.json(updatedTeam);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Error updating the team" });
  }
});

// Delete a team by ID
app.delete("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);
    res.json(deletedTeam);
  } catch (error) {
    res.status(500).json({ error: "Error deleting the team" });
  }
});

connectToDB().then(() => {
  app.listen(3000, () => console.log("Server is running"));
});
