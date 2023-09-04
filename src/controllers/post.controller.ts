import { NextFunction, Request, Response } from 'express';
const AppError = require('../utills/AppError');
import PostServices from '../services/post.service';
import catchAsync from '../utills/catchAsync';
class PostController {
  static createPost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { title, content, category } = req.body;
      const userId = parseInt(req.params.userId);
      const postServices = new PostServices();
      const postData = {
        userId,
        title: title || '',
        content: content || '',
        category: category || 'default',
      };
      postServices.createPost(postData);
      res.status(200).json({ message: 'Post Posted Successfull!' });
    }
  );
  static getAllPosts = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);
      const postServices = new PostServices();
      const allPost = await postServices.getAllPosts(userId);
      res
        .status(200)
        .json({ message: `All Post of user : ${userId}`, allPost });
    }
  );
  static deletePost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);
      const postId = parseInt(req.params.postId);
      const postServices = new PostServices();
      const post = await postServices.deletePost(userId, postId);
      res.status(200).json({ message: `Deleted Post Successfully` });
    }
  );
  static updatePost = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);
      const postId = parseInt(req.params.postId);
      const { title, content } = req.body;
      const updatedData = {
        title,
        content,
      };
      const postServices = new PostServices();
      const updatePost = await postServices.updatePost(
        userId,
        postId,
        updatedData
      );
      res.status(200).json({ message: 'All ok From post update', updatePost });
    }
  );
}
export default PostController;
