import joi from "joi";

export const entityValidator = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: "Error",
        message: error.details[0].message,
      });
    }

    next();
  };
};

export const postSchema = joi.object({
  title: joi.string().min(3).required(),
  body: joi.string().min(3).max(240).required(),
});

export const updatePostSchema = joi.object({
  title: joi.string().min(3).optional(),
  body: joi.string().min(3).max(240).optional(),
});

export const userSchema = joi.object({
  username: joi.string().min(6).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(30).required(),
});

export const commentSchema = joi.object({
  body: joi.string().min(3).max(140).required(),
  post: joi.string().required(),
});
