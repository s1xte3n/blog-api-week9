const express = require("express");

const {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    searchArticles
} = require("../controllers/article.controller.js");

const {
    validateCreateArticle,
    validateUpdateArticle,
} = require("../validations/post.validation.js");

const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

router.use("/articles", requireAuth);

// Search route
router.get("/articles/search", searchArticles);

router.post("/articles", validateCreateArticle, postArticle);
router.get("/articles", getAllArticle);
router.get("/articles/:id", getArticleById);
router.put("/articles/:id", validateUpdateArticle, updateArticleById);
router.delete("/articles/:id", deleteArticleById);

module.exports = router;
