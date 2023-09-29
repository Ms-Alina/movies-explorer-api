const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');
const ErrorCodeBadRequest = require('../errors/ErrorCodeBadRequest');

const validationUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new ErrorCodeBadRequest('Некорректный адрес URL');
};

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const editProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  editProfileValidation,
  createMovieValidation,
  deleteMovieValidation,
};
