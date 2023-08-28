import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
const AppError = require("../utills/AppError");
import { CustomRequest } from "../interfaces";
class UserController {
	static createUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { username, email, password } = req.body;
			const userService = new UserService();
			const data = await userService.createUser({ username, email, password });
			res.status(201).json({
				message: "New User Created",
			});
		} catch (error: any) {
			next(new AppError("Error Happend while creating user", 500));
		}
	};
	static logIn = async (
		req: CustomRequest,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { email, password } = req.body;
			const userService = new UserService();
			const isLogIn = await userService.userAuth(req.user, password);
			res.status(200).json({ message: "Login Status", isLogIn });
		} catch (error) {
			next(new AppError("An error occurred during login", 500));
		}
	};
	static deleteUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = parseInt(req.params.userId);
			const userService = new UserService();
			const deleteUser = await userService.deleteUser(userId);
			res.status(200).json({ message: `${userId} is Deleted Successfully!!!` });
		} catch (error) {
			next(
				new AppError(
					`An error occurred while deleting user !!! Error : ${error}`
				)
			);
		}
	};
	static getAllUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userService = new UserService();
			const users = await userService.allUser();
			res.status(200).json({ message: "All User Sended", users });
		} catch {
			next(new AppError("An error occurred during login", 500));
		}
	};
	static updatedUser = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId = parseInt(req.params.userId);
			const { password } = req.body;
			const updatedData = {
				password,
			};
			const userService = new UserService();
			const updatedUser = await userService.updatedPass(userId, updatedData);
			res.status(200).json({
				message: `ID: ${userId} is Updated Successfully!!!`,
				updatedUser,
			});
		} catch (error) {
			return next(
				new AppError(
					`An error occurred while Updatding user !!! Error : ${error}`
				)
			);
		}
	};
	static userProfile = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { firstName, lastName } = req.body;
			const userId = parseInt(req.params.userId);
			const profileData = {
				userId: userId,
				firstName: firstName || "",
				lastName: lastName || "",
			};
			const userService = new UserService();
			const updatedProfile = await userService.completeProfile(profileData);
			res
				.status(200)
				.json({ message: "User Profile Updated Succesfully", updatedProfile });
		} catch (error) {
			next(new AppError("Error Occure in UserProflie Routes", 404));
		}
	};
}
export default UserController;
