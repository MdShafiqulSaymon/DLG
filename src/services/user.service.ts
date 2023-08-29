/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../../db/db.server";
import { CustomRequest } from "../interfaces";
import AuthUttils from "../utills/auth";
class UserService {
	public async createUser({
		username,
		email,
		password,
	}: {
		username: string;
		email: string;
		password: string;
	}): Promise<any> {
		try {
			const newUser = await prisma.user.create({
				data: {
					username,
					email,
					password,
					profile: {
						create: {},
					},
				},
			});

			return Promise.resolve(newUser);
		} catch (error) {
			return Promise.reject(error);
		}
	}
	public async deleteUser(userId: number): Promise<any> {
		try {
			await prisma.user.delete({
				where: {
					id: userId,
				},
				include: {
					profile: true,
				},
			});
			Promise.resolve();
		} catch (error) {
			Promise.reject(error);
		}
	}

	public async updatedPass(userId: number, updatedData: object): Promise<any> {
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
	}
	public async userAuth(
		user: CustomRequest["user"],
		password: string
	): Promise<any> {
		try {
			if (user && password !== user.password) {
				return { message: "Invalid password" };
			}
			const authUttils = new AuthUttils();
			const token = await authUttils.generateToken(user);
			return { token };
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}
	public async allUser() {
		try {
			const user = await prisma.user.findMany({
				include: {
					profile: true,
				},
			});
			return user;
		} catch (error) {
			console.log(error);
		}
	}
	public async completeProfile(profileData: {
		userId: number;
		firstName: string;
		lastName: string;
	}): Promise<any> {
		try {
			const { userId, firstName, lastName } = profileData;
			console.log(profileData.userId);
			const updateProfile = await prisma.profile.update({
				where: {
					userId: userId,
				},
				data: {
					firstName: firstName,
					lastName: lastName,
				},
			});
			return Promise.resolve(updateProfile);
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	}
}
export default UserService;
