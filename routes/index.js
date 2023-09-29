const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');

const ErrorCodeNotFound = require('../errors/ErrorCodeNotFound');

router.use(authRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth);

router.use((req, res, next) => {
  next(new ErrorCodeNotFound('Запрашиваемая страница не существует'));
});

module.exports = router;
