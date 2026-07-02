require('dotenv').config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./database/connectDB.js");

const RequestLogger = require("./middlewares/logger.js");
const errorhandler = require("./middlewares/errorHandler.js");

const ArticleRoutes = require("./routes/article.route.js");

const app = express();

const PORT = process.env.PORT || 3007;

connectDB();

app.use(cors({
    origin: "*",
}));

app.use(express.json());

app.use(RequestLogger);

app.use("/api", ArticleRoutes);

app.use(errorhandler);

app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running",
    });
})

app.listen(PORT, ()=>{
    console.log(`Server is listening on Port ${PORT}`);
});
