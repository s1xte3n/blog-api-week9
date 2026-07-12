const ArticleModel = require("../models/article.model.js");

const postArticle = async (req, res, next) => {
    try {
        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id
        });
        await newArticle.save();

        return res.status(201).json({
            message: "Article created",
            data: newArticle
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAllArticle = async (req, res, next) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * limit;

    try {
        console.log(req.user);
        const articles = await ArticleModel.find()
            .populate("author", "name _id email")
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);

        return res.status(200).json({
            message: "Articles fetched",
            data: articles
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({
                error: "Article not found"
            });
        }

        res.json({
            message: "Article fetched",
            data: article
        });
    } catch (error) {
        next(error);
    }
};

const updateArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                error: "Article Not found"
            });
        }

        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: "You are not allowed to update this article"
            });
        }

        article.title = req.body.title ?? article.title;
        article.content = req.body.content ?? article.content;

        await article.save();

        return res.status(200                                                                              ).json({
            message: "article updated",
            data: article
        });
    } catch (error) {
        next(error);
    }
};

const deleteArticleById = async (req, res, next) => {
    try {
        const article = await ArticleModel.findByIdAndDelete(req.params.id);

        if (!article) {
            return res.status(404).json({
                error: "Article Not found"
            });
        }

        if (article.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: "You are not allowed to delete this article"
            });
        }

        res.status(200).send({
            message: "Article deleted",
            data: article,
        });
    } catch (error) {
        next(error);
    }
};

const searchArticles = async (req, res, next) => {
    try {
        const keyword = req.query.q;

        if (!keyword) {
            return res.status(400).json({
                error: "Search keyword is required",
            });
        }

        const articles = await ArticleModel.find({
            $text: {
                $search: keyword,
            },
        }).populate("author", "name _id email");

        res.status(200).json({
            message: "Articles found",
            data: articles,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    postArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    searchArticles,
};
