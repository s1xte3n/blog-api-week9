const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: 5
        },
        content: {
            type: String,
            required: true,
            minLength: 20
        },
        author: {
            type: String,
            default: "Guest"
        },
    },
    { timestamps: true }, // Auto createdAt/updatedAt
);

// Text index for search
articleSchema.index({
    title: "text",
    content: "text",
    author: "text"
});

module.exports = mongoose.model('Article', articleSchema);
