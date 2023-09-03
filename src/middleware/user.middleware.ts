import { type NextFunction, type Request, type Response } from 'express';
import prisma from '../../db/db.server';
import { type CustomRequest } from '../interfaces';
import AppError from '../utills/AppError';
class userMiddleware {
  static checkUserEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!!user) {
      next(new AppError(`User Already exist using ${email}`, 500));
    } else {
      next();
    }
  };

  static checkUserExist = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'User Not Regestered !!!' });
      }
    } catch (error) {
      next(
        new AppError(
          'Error Happen while checking User exist or not in moddleware',
          500
        )
      );
    }
  };

  static checkUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
      next(
        new AppError('Internal Error while delete user in UserMiddleware', 500)
      );
    }
  };
}
export default userMiddleware;
