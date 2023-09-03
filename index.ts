/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import appRouter from './src/routes';
import { ENV } from './src/config/envConfig';

const app = express();
app.use(express.json());
app.use('/api', appRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
