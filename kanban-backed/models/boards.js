const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
