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
      type: String,
      default: "Guest",
      trim: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
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
  author: "text",
  category: "text",
  tags: "text",
});

module.exports = mongoose.model('Article', articleSchema);
