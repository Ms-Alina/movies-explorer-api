const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const customError = require('../errors/customError');
const config = require('../config');

const checkUser = (user, res) => {
  if (!user) {
    throw new customError.ErrorCodeNotFound('Нет пользователя с таким id');
  }
  return res.status(200).send(user);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
        .then((newUser) => {
          res.status(201).send({
            email: newUser.email,
            name: newUser.name,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(new customError.ErrorCodeConflict('Этот email уже зарегистрирован'));
          }
          next(error);
        });
    })
    .catch(next);
};

const updateUserProfile = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    owner,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new customError.ErrorCodeBadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(error);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new customError.ErrorCodeNotFound('Пользователь с таким id не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new customError.ErrorCodeAuth('Неверные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new customError.ErrorCodeAuth('Неверные почта или пароль'));
        }
        const token = jwt.sign(
          { _id: user._id },
          config.jwtSecret,
          { expiresIn: '7d' },
        );
        return res.send({ token });
      });
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUserProfile,
  getCurrentUser,
  login,
};
