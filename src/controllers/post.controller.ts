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
const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const allPost = await postServices.getAllPosts(userId);
		res.status(200).json({ message: `All Post of user : ${userId}`, allPost });
	} catch (error) {
		next(new AppError(error, 500));
	}
};
const deletePost = (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const postId = parseInt(req.params.postId);
		const post = postServices.deletePost(userId, postId);
		res.status(200).json({ message: `Deleted Post Successfully` });
	} catch (error) {
		next(new AppError(error, 500));
	}
};
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const postId = parseInt(req.params.postId);
		const { title, content } = req.body;
		const updatedData = {
			title,
			content,
		};
		const updatePost = await postServices.updatePost(
			userId,
			postId,
			updatedData
		);
		res.status(200).json({ message: "All ok From post update", updatePost });
	} catch (error) {
		next(new AppError("error Happen to Update Post", 500));
	}
};
const postController = {
	createPost,
	deletePost,
	getAllPosts,
	updatePost,
};
export default postController;
