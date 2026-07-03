const Joi = require("joi");

const ArticleModel = require("../models/article.model.js");

const postArticle = async (req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).required(),
        content: Joi.string().min(20).required(),
        author: Joi.string().optional().default("Guest"),
        category: Joi.string().default("General"),
        tags: Joi.array().items(Joi.string()).default([]),
        published: Joi.boolean().default(true),
    });

    const { error, value } = articleSchema.validate(req.body);

    if (error || !value) {
        return res.status(400).json({
            message: "Please provide article title and content",
            error: error.details[0].message,
        });
    }

    try {
        const newArticle = new ArticleModel(value);
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
        const articles = await ArticleModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip);


        if (!articles) {

        }

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
    const articleSchema = Joi.object({
        title: Joi.string().min(5).optional(),
        content: Joi.string().min(20).optional(),
        author: Joi.string().optional(),
        category: Joi.string(),
        tags: Joi.array().items(Joi.string()),
        published: Joi.boolean(),
    }).min(1);

    const { error, value } = articleSchema.validate(req.body);

    if (error || !value) {
        return res.status(400).json({
            message: "Please provide article title and content",
            error: error.details[0].message,
        });
    }

    try {
        const updatedArticle = await ArticleModel.findByIdAndUpdate(
            req.params.id,
            value,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                error: "Article Not found"
            });
        }

        res.json({
            message: "article updated",
            data: updatedArticle
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

        const articles = await ArticleModel.find({
            $text: {
                $search: keyword,
            },
        });

        if (!keyword) {
            return res.status(400).json({
                error: "Search keyword is required",
            });
        }

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
