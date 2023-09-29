const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./utils/limiter');
const cors = require('./middlewares/cors');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const connectDB = require('./db');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
connectDB();

// парсим данные (собираем пакеты)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// для защиты приложения
app.use(helmet());
app.disable('x-powered-by'); // отключает заголовок X-Powered-By

app.use(requestLogger);

app.use(cors);

app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
