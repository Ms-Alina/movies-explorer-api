const jwt = require('jsonwebtoken');
const config = require('../config');
const ErrorCodeAuth = require('../errors/ErrorCodeAuth');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorCodeAuth('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
  } catch (err) {
    return next(new ErrorCodeAuth('Необходима авторизация'));
  }

  return next();
};
