import { CustomRequest } from '../interfaces';
import AuthUttils from '../utills/auth';
import { IUser } from '../type/user.type';
import { DbType, db } from '../db';
import BaseRepository from '../repository/base.repository';
import { user } from '@prisma/client';
export class UserServices extends BaseRepository<DbType> {
  constructor() {
    super(db, 'user');
  }
  public async createUser({
    username,
    email,
    password,
  }: IUser): Promise<IUser> {
    try {
      const newUser = await this.create<IUser>({ username, email, password });
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  public async updatePass(
    id: number,
    updatedData: Partial<IUser>
  ): Promise<IUser> {
    try {
      const user = await this.update<IUser, user>(id, updatedData);
      return user;
    } catch (error) {
      throw error;
    }
  }
  public async allUser(): Promise<IUser> {
    try {
      const allUser = await this.getAll<IUser, user>();
      return allUser;
    } catch (error) {
      throw error;
    }
  }
  public async deleteUser(id: number): Promise<any> {
    try {
      const deleteUser = await this.delete(id);
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }
  public async userAuth(
    user: CustomRequest['user'],
    password: string
  ): Promise<any> {
    try {
      if (user && password !== user.password) {
        return { message: 'Invalid password' };
      }
      const authUttils = new AuthUttils();
      const token = await authUttils.generateToken(user);
      return { token };
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
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
      const updateProfile = await db.profile.update({
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
export class UserService {
  public async createUser({ username, email, password }: IUser): Promise<any> {
    try {
      const newUser = await db.user.create({
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
      await db.user.delete({
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
      const updatedUser = await db.user.update({
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
    user: CustomRequest['user'],
    password: string
  ): Promise<any> {
    try {
      if (user && password !== user.password) {
        return { message: 'Invalid password' };
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
      const user = await db.user.findMany({
        include: {
          profile: true,
        },
      });
      return user;
    } catch (error) {
      return error;
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
      const updateProfile = await db.profile.update({
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
