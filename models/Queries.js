const mongoose = require("mongoose");
const { Schema } = mongoose;

const QueriesSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending",
  },
});

const Queries = mongoose.model("Queries", QueriesSchema);

module.exports = Queries;
