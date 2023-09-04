import BaseRepository from '../repository/base.repository';
import { db, DbType } from '../db';
export default class UserRepository extends BaseRepository<DbType> {
  constructor() {
    super(db, 'user');
  }
}
