require('dotenv').config();

const {
  NODE_ENV,
  PORT,
  PROD_KEY,
  DEV_KEY,
  CONNECT,
} = process.env;

const config = {
  nodeEnv: NODE_ENV || 'development',
  port: PORT || 3000,
  jwtSecret: NODE_ENV === 'production' ? PROD_KEY : DEV_KEY || 'dev-key',
  connectDbString: CONNECT || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};

module.exports = config;
