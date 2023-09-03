import prisma from '../../db/db.server';

class PostService {
  public async updatePost(
    userId: number,
    postId: number,
    updateData: { title: string; content: string }
  ): Promise<any> {
    try {
      if (!updateData.title) updateData.title = '';
      if (!updateData.content) updateData.content = '';
      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
          authorId: userId,
        },
        data: {
          title: updateData.title,
          content: updateData.content,
        },
      });
      return Promise.resolve(updatedPost);
    } catch (error) {
      Promise.reject(new Error(JSON.stringify(error)));
    }
  }

  public async deletePost(userId: number, postId: number): Promise<any> {
    try {
      const post = await prisma.post.delete({
        where: {
          authorId: userId,
          id: postId,
        },
      });
      return Promise.resolve(post);
    } catch (error) {
      return Promise.reject(new Error(JSON.stringify(error)));
    }
  }

  public async getAllPosts(userId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const allPost = await prisma.post.findMany({
          where: { authorId: userId },
        });
        resolve(allPost);
      } catch (error) {
        return Promise.reject(new Error(JSON.stringify(error) ?? ''));
      }
    });
  }

  public async createPost(postData: {
    userId: number;
    title: string;
    content: string;
    category: string;
  }): Promise<any> {
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
      return Promise.resolve('sadasdas');
    } catch (error) {
      return Promise.reject(new Error(JSON.stringify(error) ?? ''));
    }
  }
}

export default PostService;
