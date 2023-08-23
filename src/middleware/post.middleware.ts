import { NextFunction, Request, Response } from "express";
import prisma from "../../db/db.server";
const AppError = require("../utills/AppError");
const checkPostId = async (req: Request, res: Response, next: NextFunction) => {
	const userId = parseInt(req.params.userId);
	const postId = parseInt(req.params.postId);
	const exist = await prisma.post.findFirst({
		where: {
			authorId: userId,
			id: postId,
		},
	});
	if (exist) {
		next();
	} else {
		next(
			new AppError(
				`This post (postId : ${postId}) is not in the List of This user: ${userId}`
			)
		);
	}
};

const postMiddleware = {
	checkPostId,
};
export default postMiddleware;
