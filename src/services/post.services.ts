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
		const newCategory = await prisma.category.create({
			data: {
				type: category,
			},
		});
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
				cateId: newCategory.id,
			},
		});
	} catch (error) {
		Promise.reject(error);
	}
};

const postServices = {
	createPost,
};

export default postServices;
