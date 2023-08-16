import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";
import { PrismaClient } from "@prisma/client";
const AppError = require("../utills/AppError");
import prisma from "../../db/db.server";
const authUttils = require("../utills/auth");
import { CustomRequest } from "../interfaces";
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
		console.log("isLogIn", isLogIn);
		if (!isLogIn) {
			res.status(500).json({ message: "Invalid Password" });
		}
		res.status(200).json({ message: "Login successful", token: isLogIn });
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
const getAllUser = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json({ message: "All User Sended", users });
	} catch {
		res
			.status(500)
			.json({ message: "Error Occure While Read User In Catch Block" });
	}
};
const updatedUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const { password } = req.body;
		const updatedData = {
			password,
		};
		const updatedUser = await userService.updatedUser(userId, updatedData);
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
const userController = {
	createUser,
	logIn,
	deleteUser,
	getAllUser,
	updatedUser,
};

export default userController;
