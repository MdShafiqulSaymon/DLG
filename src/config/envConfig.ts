import env from 'dotenv';
env.config();

export const ENV = {
  DATABASE_URL_WORKBENCH: process.env.DATABASE_URL_WORKBENCH ?? '',
  PORT: process.env.PORT ?? 3000,
  TOKEN_SECRET_KEY: process.env.TOKEN_SECRET_KEY,
};
