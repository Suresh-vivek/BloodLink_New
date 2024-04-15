const mongoose = require("mongoose");

// Define the schema for the request
const requestSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
});

// Create a model based on the schema
const RequestModel = mongoose.model("Request", requestSchema);

module.exports = RequestModel;
