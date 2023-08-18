import prisma from "../../db/db.server";
import { CustomRequest } from "../interfaces";
const env = require("dotenv");
const authUttils = require("../utills/auth");
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
const userAuth = async (
	user: CustomRequest["user"],
	password: string
): Promise<any> => {
	try {
		const fintUser = await prisma.user.findUnique({
			where: {
				email: user?.email,
			},
		});
		if (user && password !== user.password) {
			return { message: "Invalid password" };
		}
		const token = await authUttils.generateToken(user);
		return { token };
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};
const allUsers = async () => {
	try {
		const user = await prisma.user.findMany();
		return user;
	} catch (error) {
		console.log(error);
	}
};
const userService = {
	createUser,
	deleteUser,
	updatedUser,
	userAuth,
	allUsers,
};

export default userService;
