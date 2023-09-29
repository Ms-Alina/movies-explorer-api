const Movie = require('../models/movie');
const customError = require('../errors/customError');

const getMovies = (req, res, next) => {
  // Movie.find({})
  //   .populate(['owner'])
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new customError.ErrorCodeBadRequest('Переданы некорректные данные при создании фильма'));
      }
      return next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .orFail(() => {
      throw new customError.ErrorCodeNotFound('Карточка с указанным _id не найдена');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(movieId).then(() => res.status(200).send(movie));
      }
      return next(new customError.ErrorCodeBanned('В доступе отказано'));
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
