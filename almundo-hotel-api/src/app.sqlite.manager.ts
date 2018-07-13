import { Component } from '@nestjs/common';
import { LoggerUtil } from '../../common-hotel-dependencies/src/shared-module/core/util/LoggerUtil';
import * as sqlite3 from 'sqlite3';
import * as path from 'path';

const routeFileDb = path.resolve(__dirname, 'hotel_data.sqlite3');
const logger: LoggerUtil = new LoggerUtil('SqliteManager', __filename);
const sqlite3Db = new sqlite3.Database(routeFileDb);

@Component()
export class SqliteManager {

    constructor() {
        sqlite3Db.serialize(() => {
            sqlite3Db.get('SELECT 1;',
                {}, (err, row) => {
                    if (err) {
                        new Error('No DB connection.');
                    } else {
                        logger.info('DB connection success!');
                    }
                });
        });
    }

    public selectOne(sqlStr: string, callSuccess: (result: any) => any, callError: (error: any) => any) {
        sqlite3Db.serialize(() => {
            sqlite3Db.get(sqlStr,
                {}, (err, row) => {
                    if (err) {
                        callError(err);
                    } else {
                        callSuccess(row);
                    }
                });
        });
    }

    public select(sqlStr: string, callSuccess: (result: Array<any>) => any, callError: (error: any) => any) {
        sqlite3Db.serialize(() => {
            sqlite3Db.all(sqlStr,
                {}, (err, rows) => {
                    if (err) {
                        callError(err);
                    } else {
                        callSuccess(rows);
                    }
                });
        });
    }

    public getDb() {
        return sqlite3Db;
    }

}