/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import appRouter from './src/routes';
import { ENV } from './src/config/envConfig';
import createServer from './src/utills/server';

const app =createServer()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
export default app;