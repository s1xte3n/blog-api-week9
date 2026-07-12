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
} = require("../validations/article.validation.js");

const requireAuth = require("../middlewares/requireAuth.js");

const router = express.Router();

// Search route
router.get("/articles/search", requireAuth, searchArticles);

router.post("/articles", requireAuth, validateCreateArticle, postArticle);
router.get("/articles", requireAuth, getAllArticle);
router.get("/articles/:id", requireAuth, getArticleById);
router.put("/articles/:id", requireAuth, validateUpdateArticle, updateArticleById);
router.delete("/articles/:id", requireAuth, deleteArticleById);

module.exports = router;
