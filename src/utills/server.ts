import express from "express";
import appRouter from "../routes";

function createServer() {
  const app = express();

  app.use(express.json());

  app.use('/api',appRouter);

  return app;
}

export default createServer;