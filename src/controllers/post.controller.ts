import { NextFunction, Request, Response } from "express";
const AppError = require("../utills/AppError");
import postServices from "../services/post.services";

const createPost = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { title, content, category } = req.body;
		const userId = parseInt(req.params.userId);
		const postData = {
			userId,
			title: title || "",
			content: content || "",
			category: category || "default",
		};
		postServices.createPost(postData);
		res.status(200).json({ message: "Post Posted Successfull!" });
	} catch (error) {
		next(
			new AppError("Error happing when User Try to Create a post Route", 500)
		);
	}
};

const postController = {
	createPost,
};
export default postController;
