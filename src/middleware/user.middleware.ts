import { NextFunction, Request, Response } from "express";
import prisma from "../../db/db.server";
const AppError = require("../utills/AppError");
import { CustomRequest } from "../interfaces";
const checkUserEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { username, email, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (user) {
		return next(new AppError(`User Already exist using ${email}`, 500));
	} else {
		return next();
	}
};
const checkUserExist = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { username, email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (user) {
			(req.user = user), next();
		} else {
			res.status(404).json({ message: "User Not Regestered !!!" });
		}
	} catch (error) {
		next(
			new AppError(
				"Error Happen while checking User exist or not in moddleware",
				500
			)
		);
	}
};
const checkUserId = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.params.userId);
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user)
			next(
				new AppError(
					`This user Id : ${userId} is not Registered in Server`,
					404
				)
			);
		next();
	} catch (error) {
		return next(
			new AppError("Internal Error while delete user in UserMiddleware", 500)
		);
	}
};
const userMiddleware = {
	checkUserEmail,
	checkUserExist,
	checkUserId,
};
export default userMiddleware;
