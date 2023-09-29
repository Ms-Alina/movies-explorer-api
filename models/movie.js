const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

// описание схемы фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна создания фильма обязательна'],
  },
  director: {
    type: String,
    required: [true, 'Режиссер фильма обязателен'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность фильма обязательна'],
  },
  year: {
    type: String,
    required: [true, 'Год выпуска фильма обязателен'],
  },
  description: {
    type: String,
    required: [true, 'Описание фильма обязателено'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка на постер фильма обязательна'],
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка на трейлер фильма обязательна'],
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Ссылка на mini-постер фильма обязательна'],
    validate: {
      validator: (url) => isUrl(url),
      message: 'Некорректный адрес URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Название фильма на русском обязательно'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название фильма на английском обязательно'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
