const usersRouter = require('express').Router();
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');
const { editProfileValidation } = require('../middlewares/validation');

// возвращает текущего пользователя
usersRouter.get('/me', getCurrentUser);
// обновляет профиль
usersRouter.patch('/me', editProfileValidation, updateUserProfile);

module.exports = usersRouter;
