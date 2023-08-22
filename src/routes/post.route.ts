import express from "express";
const router = express.Router();
import postController from "../controllers/post.controller";
import prisma from "../../db/db.server";
import utils from "../middleware/utils";
import userMiddleware from "../middleware/user.middleware";

router.post(
	"/createPost/:userId",
	userMiddleware.checkUserId,
	postController.createPost
);
module.exports = router;
