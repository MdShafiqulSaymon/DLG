import { Router } from "express";
const appRouter = Router();
const user = require("./user.route");

appRouter.use(user);
export default appRouter;
