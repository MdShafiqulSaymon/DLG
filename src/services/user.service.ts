import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../../db/db.server";
import { error } from "console";
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const AppError = require("../utills/AppError");
env.config();
const createUser = async ({
	username,
	email,
	password,
}: {
	username: string;
	email: string;
	password: string;
}): Promise<any> => {
	try {
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password,
			},
		});
		return Promise.resolve(newUser);
	} catch (error) {
		return Promise.reject(error);
	}
};
// const findUserId = async ({ id }: { id: number }): Promise<any> => {
// 	try {
// 		const user = await prisma.user.findUnique({
// 			where: {
// 				id: id,
// 			},
// 		});
// 		if (user) Promise.resolve(user);
// 		else throw error();
// 	} catch (error) {}
// };
const deleteUser = async (userId: number): Promise<any> => {
	try {
		await prisma.user.delete({
			where: {
				id: userId,
			},
		});
		Promise.resolve();
	} catch (error) {
		Promise.reject(error);
	}
};
const updatedUser = async (
	userId: number,
	updatedData: Object
): Promise<any> => {
	try {
		const updatedUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: updatedData,
		});
		return Promise.resolve(updatedUser);
	} catch (error) {
		return Promise.reject(error);
	}
};
const userService = {
	createUser,
	deleteUser,
	updatedUser,
};

export default userService;
