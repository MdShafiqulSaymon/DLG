// import prisma from "../../../db/db.server";
// import { PrismaClient, User } from "@prisma/client";

// type PrismaModel = keyof PrismaClient;
// export default class BaseRepository<T> {
// 	protected model: "user" | "category";

// 	constructor(model: "user" | "category") {
// 		this.model = model;
// 	}

// 	async create(data: {

//     }) {
// 		const newCreate = await prisma[this.model].create({
//             data:data
//         })
// 		return newCreate;
// 	}
// 	// async deleteById(id: number) {
// 	// 	this.model.delete({
// 	// 		where: {
// 	// 			id: id,
// 	// 		},
// 	// 	});
// 	// }
// 	// async update(id: number, updateData: any) {
// 	// 	const newUpdate = this.model.update({
// 	// 		where: {
// 	// 			id: id,
// 	// 		},
// 	// 		data: updateData,
// 	// 	});
// 	// 	return newUpdate;
// 	// }
// 	// async getAll() {
// 	// 	const data = this.model.findMany();
// 	// 	return data;
// 	// }
// 	// async findById(id: number) {
// 	// 	return await this.model.findById({
// 	// 		where: {
// 	// 			id: id,
// 	// 		},
// 	// 	});
// 	// }
// }
