const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  donorname: {
    type: String,
    required: true,
  },
  donorage: {
    type: String, // You might want to use Number if storing age as a number
    required: true,
  },
  donoraddress: {
    type: String,
    required: false,
  },
  donorPhone: {
    type: String,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+"], // Enumerating possible blood groups
  },
  detectlocation: {
    latitude: { type: String },
    longitude: { type: String },
  },
});

const SignupModel = mongoose.model("Signup", signupSchema);

module.exports = SignupModel;
