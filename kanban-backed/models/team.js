const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const teamSchema = new mongoose.Schema({
  id: {
    type: String, // Assuming your UUID is a string
    default: uuidv4,
    index: { unique: true },
  },
  title: {
    type: String,
    maxlength: 120,
  },
  description: String,
  created_date: {
    type: Date,
    default: Date.now(),
  },
  updated_date: {
    type: Date,
    default: Date.now(),
  },
  boards: String,
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
