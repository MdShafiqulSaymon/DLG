import { DbType, db } from '../db';
import BaseRepository from './base.repository';
export default class UserRepository extends BaseRepository<DbType> {
  constructor() {
    super(db, 'user');
  }
}
