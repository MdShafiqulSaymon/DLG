import { NextFunction, Request, Response } from 'express';
import { UserServices } from '../services/user.service';
const AppError = require('../utills/AppError');
import { CustomRequest } from '../interfaces';
import catchAsync from '../utills/catchAsync';
import { channel } from 'diagnostics_channel';
class UserController {
  static createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, email, password } = req.body;
      const userService = new UserServices();
      const data = await userService.createUser({
        username,
        email,
        password,
      });
      res.status(201).json({
        message: 'New User Created',
      });
    }
  );
  static logIn = catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const { email, password } = req.body;
      const userService = new UserServices();
      const isLogIn = await userService.userAuth(req.user, password);
      res.status(200).json({ message: 'Login Status', isLogIn });
    }
  );
  static deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);
      const userService = new UserServices();
      const deleteUser = await userService.deleteUser(userId);
      res.status(200).json({ message: `${userId} is Deleted Successfully!!!` });
    }
  );
  static getAllUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userService = new UserServices();
      const users = await userService.allUser();
      res.status(200).json({ message: 'All User Sended', users });
    }
  );
  static updatedUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = parseInt(req.params.userId);
      const { password } = req.body;
      const updatedData = {
        password,
      };
      const userService = new UserServices();
      const updatedUser = await userService.updatePass(userId, updatedData);
      res.status(200).json({
        message: `ID: ${userId} is Updated Successfully!!!`,
        updatedUser,
      });
    }
  );
  static userProfile = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { firstName, lastName } = req.body;
      const userId = parseInt(req.params.userId);
      const profileData = {
        userId: userId,
        firstName: firstName || '',
        lastName: lastName || '',
      };
      const userService = new UserServices();
      const updatedProfile = await userService.completeProfile(profileData);
      res
        .status(200)
        .json({ message: 'User Profile Updated Succesfully', updatedProfile });
    }
  );
}
export default UserController;
