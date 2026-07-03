const mongoose = require("mongoose");
const Article = require("../models/article.model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Article.syncIndexes();

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
