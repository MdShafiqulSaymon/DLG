import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
const AppError = require("../utills/AppError");
import { CustomRequest } from "../interfaces";
import { connect } from "http2";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, email, password } = req.body;
		const data = await userService.createUser({ username, email, password });
		res.status(201).json({
			message: "New User Created",
		});
	} catch (error: any) {
		next(new AppError("Error Happend while creating user", 500));
	}
};
const logIn = async (req: CustomRequest, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;

		const isLogIn = await userService.userAuth(req.user, password);
		res.status(200).json({ message: "Login Status", isLogIn });
	} catch (error) {
		next(new AppError("An error occurred during login", 500));
	}
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const deleteUser = await userService.deleteUser(userId);
		res.status(200).json({ message: `${userId} is Deleted Successfully!!!` });
	} catch (error) {
		next(
			new AppError(`An error occurred while deleting user !!! Error : ${error}`)
		);
	}
};
const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.allUsers();
		res.status(200).json({ message: "All User Sended", users });
	} catch {
		next(new AppError("An error occurred during login", 500));
	}
};
const updatedUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const { password } = req.body;
		const updatedData = {
			password,
		};
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
const userProfile = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firstName, lastName } = req.body;
		const userId = parseInt(req.params.userId);
		const profileData = {
			userId: userId,
			firstName: firstName || "",
			lastName: lastName || "",
		};
		const updatedProfile = await userService.completeProfile(profileData);
		res
			.status(200)
			.json({ message: "User Profile Updated Succesfully", updatedProfile });
	} catch (error) {
		next(new AppError("Error Occure in UserProflie Routes", 404));
	}
};
const userController = {
	createUser,
	logIn,
	deleteUser,
	getAllUser,
	updatedUser,
	userProfile,
};

export default userController;
