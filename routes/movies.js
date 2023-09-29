const moviesRouter = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');

// возвращает все фильмы
moviesRouter.get('/', getMovies);
// создаёт фильм
moviesRouter.post('/', createMovieValidation, createMovie);
// удаляет фильм по _id
moviesRouter.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
