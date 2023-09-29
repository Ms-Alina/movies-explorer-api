const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

// описание схемы пользователя
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный адрес почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле с именем не может быть пустым'],
    minLength: [2, 'Минимальная длина поля с именем не может быть короче двух символов'],
    maxLength: [30, 'Максимальная длина поля с именем не может быть длиннее 30 символов'],
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
