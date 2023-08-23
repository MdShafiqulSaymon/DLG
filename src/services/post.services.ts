import prisma from "../../db/db.server";
const env = require("dotenv");
env.config();

const createPost = async (postData: {
	userId: number;
	title: string;
	content: string;
	category: string;
}): Promise<any> => {
	try {
		const { userId, title, content, category } = postData;
		const findCategory = await prisma.category.findFirst({
			where: {
				type: category,
			},
		});
		let categoryIdNew;
		if (!findCategory) {
			const newCategory = await prisma.category.create({
				data: {
					type: category,
				},
			});
			categoryIdNew = newCategory.id;
		} else {
			categoryIdNew = findCategory.id;
		}
		const newPost = await prisma.post.create({
			data: {
				title,
				content,
				author: {
					connect: { id: userId },
				},
			},
		});
		await prisma.post_category.create({
			data: {
				postId: newPost.id,
				cateId: categoryIdNew,
			},
		});
	} catch (error) {
		Promise.reject(error);
	}
};
const getAllPosts = async (userId: number): Promise<any> => {
	try {
		const allPost = await prisma.post.findMany({
			where: { authorId: userId },
		});
		return allPost;
	} catch (error) {
		Promise.reject("Can not get All user Post.Service Funtion");
	}
};
const deletePost = async (userId: number, postId: number): Promise<any> => {
	try {
		const post = await prisma.post.delete({
			where: {
				authorId: userId,
				id: postId,
			},
		});

		return !!post;
	} catch (error) {
		Promise.reject(error);
	}
};
const postServices = {
	createPost,
	getAllPosts,
	deletePost,
};

export default postServices;
