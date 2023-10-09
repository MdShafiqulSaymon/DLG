import { type Prisma, user } from '@prisma/client';
export default class BaseRepository<DatabaseType> {
  protected db: DatabaseType;
  protected model: Prisma.ModelName;
  constructor(db: DatabaseType, model: Prisma.ModelName) {
    this.db = db;
    this.model = model;
  }
  protected async create<T>(data: Partial<T>): Promise<T> {
    try {
      const newItem = await this.db[this.model].create({ data });
      return newItem;
    } catch (error) {
      throw error;
    }
  }
  protected async update<FormattedDataType, PrismaTableType>(
    id: number,
    data: Partial<PrismaTableType>
  ): Promise<FormattedDataType> {
    try {
      const updatedItem = await this.db[this.model].update({
        where: {
          id,
        },
        data,
      });
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }
  protected async getAll<
    FormattedDataType,
    PrismaTableType,
  >(): Promise<FormattedDataType> {
    try {
      const allInfo = await this.db[this.model].findMany();
      return allInfo;
    } catch (error) {
      throw error;
    }
  }
  protected async get<T>(searchKey: any): Promise<T> {
    try {
      const data = await this.db[this.model].findMany({
        where: {
          id: searchKey,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  protected async delete<T>(id: number): Promise<T> {
    try {
      const deleteItem = await this.db[this.model].delete({
        where: {
          id,
        },
      });
      return deleteItem;
    } catch (error) {
      throw error;
    }
  }
  protected async test<T>(data: any) {}
}
