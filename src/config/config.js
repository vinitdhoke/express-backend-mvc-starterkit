import dotenv from 'dotenv';
import logger from 'loglevel';

dotenv.config()

logger.enableAll()
const ENV = process.env.NODE_ENV || 'development'

const CONFIG = {
  development: {
    app: {
      PORT: process.env.PORT || 8000,
      SALT_ROUNDS: process.env.SALT_ROUNDS,
      JWT_SECRET: process.env.JWT_SECRET
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug
    },
    db: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "",
        DB: "testdb",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
  },
  production: {
    app: {
      PORT: process.env.PORT || 8000,
      SALT_ROUNDS: process.env.SALT_ROUNDS,
      JWT_SECRET: process.env.JWT_SECRET
    },
    logger: {
      warn: logger.warn,
      info: logger.info,
      error: logger.error,
      trace: logger.trace,
      debug: logger.debug
    },
    db: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "",
        DB: "testdb",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
  }
}
export default CONFIG[ENV];