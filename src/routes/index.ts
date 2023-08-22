import { Router } from "express";
const appRouter = Router();
const user = require("./user.route");
const post = require("./post.route");

appRouter.use(user);
appRouter.use(post);
export default appRouter;
