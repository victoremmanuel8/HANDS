const mongoose = require("mongoose");

const cl_viewsSchema = new mongoose.Schema({
  videoId: {
    type: String,
    ref: "Post", // Referência ao modelo de vídeo
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  dt_view: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cl_views", cl_viewsSchema);
