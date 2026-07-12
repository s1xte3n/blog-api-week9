const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

// Enable text search
articleSchema.index({
  title: "text",
  content: "text",
});

module.exports = mongoose.model('Article', articleSchema);
