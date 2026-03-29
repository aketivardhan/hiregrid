const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

  title: String,
  company: String,
  location: String,
  salary: String,
  type: String,
  description: String,
  logo: String,

  // 🔥 SKILLS FIELD
  skills: {
    type: [String],
    default: []
  },

  createdBy: String,

  applicants: [
    {
      email: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  savedBy: {
    type: [String],
    default: []
  }

});

module.exports = mongoose.model("Job", jobSchema);