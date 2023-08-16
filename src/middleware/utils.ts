import { NextFunction, Request, Response } from "express";
import prisma from "../../db/db.server";
import { PrismaClient, User } from "@prisma/client";
import { error } from "console";

export interface CustomRequest extends Request {
	user?: User;
}
const checkUiserId = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const userId = parseInt(req.params.userId);
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!user) throw new Error("Error Occured!!");

	req.user = user;
	next();
};
// const checkId = async (
// 	req: CustomRequest,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	const { userId } = req.params;
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			id: parseInt(userId),
// 		},
// 	});
// 	if (!user) {
// 		throw Error("User Not Found");
// 	}
// 	req.user = user;
// 	next();
// };

const utils = {
	checkUiserId,
};
export default utils;
