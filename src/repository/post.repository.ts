import BaseRepository from './base.repository';
import { db, DbType } from '../db';
export default class PostRepository extends BaseRepository<DbType> {
  constructor() {
    super(db, 'post');
  }
}
