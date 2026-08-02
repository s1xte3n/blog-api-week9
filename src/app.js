require('dotenv').config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/connectDB.js");

const RequestLogger = require("./middlewares/logger.js");
const errorhandler = require("./middlewares/errorHandler.js");

const ArticleRoutes = require("./routes/article.route.js");
const UserRoutes = require("./routes/user.route.js");

const app = express();

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.use(RequestLogger);

app.use("/api", ArticleRoutes);
app.use("/api/users", UserRoutes);

app.use(errorhandler);

app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running",
    });
})

module.exports = app;
