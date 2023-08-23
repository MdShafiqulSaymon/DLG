import express from "express";
const router = express.Router();
import postController from "../controllers/post.controller";
import prisma from "../../db/db.server";
import utils from "../middleware/utils";
import userMiddleware from "../middleware/user.middleware";
import postMiddleware from "../middleware/post.middleware";

router.post(
	"/createPost/:userId",
	userMiddleware.checkUserId,
	postController.createPost
);
router.get(
	"/getAllPosts/:userId",
	userMiddleware.checkUserId,
	postController.getAllPosts
);
router.delete(
	"/deletePost/:userId/:postId",
	userMiddleware.checkUserId,
	postMiddleware.checkPostId,
	postController.deletePost
);
module.exports = router;
