import { Database } from 'sqlite3';

import logger from '../../utils/logger';

import { SqliteDB } from '../../providers/database';

export class BaseRepository {
  public db: Database;

  constructor() {
    this.db = new SqliteDB().connection;
  }

  run(sql: string, params: any[] = []): Promise<void> {
    return new Promise((_, rej) => {
      this.db.run(sql, params, (err: any) => {
        if (err) {
          logger.error(err);
          rej(err);
        }
      });
    });
  }

  get<T>(sql: string, params: any[] = []): Promise<T | null> {
    const model = new Promise<T | null>((res, rej) => {
      this.db.get(sql, params, (err: any, result: T) => {
        if (err) {
          logger.error(err);
          rej(err);
        }
        this.db.close();
        res(result);
      });
    });
    return model;
  }

  all<T>(sql: string, params: any[] = []): Promise<T[] | []> {
    const model = new Promise<T[] | []>((res, rej) => {
      this.db.all(sql, params, (err: any, result: T[]) => {
        if (err) {
          logger.error(err);
          rej(err);
        }

        res(result);
      });
    });
    this.db.close();
    return model;
  }
}
