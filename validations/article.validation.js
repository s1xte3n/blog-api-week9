const Joi = require('joi');

const createArticleSchema = Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().min(20).required(),
});

const validateArticle = (req, res, next) => {
    console.log(req.body);
    const { error } = CreateArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    next();
};

const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).optional(),
    content: Joi.string().min(20).optional(),
}).min(1);

const validateUpdateArticle = (req, res, next) => {
    const { error, value } = updateArticleSchema.validate(req.body);

    if (error || !value) {
        return res.status(400).json({
            message: "Please provide article title and content",
            error: error.details[0].message,
        });
    }

    req.body = value;
    next();
};

const validateCreateArticle = (req, res, next) => {
    const { error, value } = createArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message,
        });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateArticle,
    validateUpdateArticle,
};
