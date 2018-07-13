import { Component, HttpStatus } from '@nestjs/common';
import { HotelModel } from '../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { FilterRequestModel } from '../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';
import { LoggerUtil } from '../../common-hotel-dependencies/src/shared-module/core/util/LoggerUtil';
import { SqliteManager } from './app.sqlite.manager';
import { Response } from 'express';

const logger: LoggerUtil = new LoggerUtil('HotelService', __filename);
const hotelListConst: Array<HotelModel> = require('../resource/data.json');

/**
 * @export
 * @class HotelService
 */
@Component()
export class HotelService {

    /**
     * @private
     * @type {Array<number>}
     * @memberof HotelService
     */
    private validStars: Array<number> = [0, 1, 2, 3, 4, 5];

    /**
     * Creates an instance of HotelService.
     * @param {SqliteManager} sqliteManager
     * @memberof HotelService
     */
    constructor(private sqliteManager: SqliteManager) { }
    
    /**
     * getStaticHotelList
     * @returns {Array<HotelModel>}
     * @memberof HotelService
     */
    public getStaticHotelList(): Array<HotelModel> {
        return hotelListConst;
    }

    /**
     * findAllHotels2
     * @returns {Promise<Array<HotelModel>>}
     * @memberof HotelService
     */
    public findAllHotels2(): Promise<Array<HotelModel>> {
        return new Promise<Array<HotelModel>>((resolve) => {
            this.sqliteManager.select('SELECT * FROM hotel ORDER by creationdate DESC LIMIT 100',
                (resultHotelList) => {
                    resolve(resultHotelList);
                },
                (error) => {
                    logger.error('Error findAllHotels: ', error);
                    new Error('Error findAllHotels');
                },
            );
        });
    }

    /**
     * findAllHotels
     * @param {Response} res
     * @returns {Array<HotelModel>}
     * @memberof HotelService
     */
    public findAllHotels(res: Response): Array<HotelModel> {
        logger.info('---> init findAllHotels... ');
        this.sqliteManager.getDb().serialize(() => {
            this.sqliteManager.getDb().all('SELECT * FROM hotel ORDER by creationdate DESC LIMIT 100',
                {}, (err, rows) => {
                    if (err) {
                        logger.error('error findAllHotels... ', err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
                    } else {
                        logger.info('---> resolve findAllHotels... ');
                        res.status(HttpStatus.OK).json(rows);
                    }
                });
        });
        return [];
    }

    /**
     * findFilterHotels
     * @param {FilterRequestModel} filterRequest
     * @param {Response} res
     * @returns {Array<HotelModel>}
     * @memberof HotelService
     */
    public findFilterHotels(filterRequest: FilterRequestModel, res: Response): Array<HotelModel> {
        logger.info('---> init findFilterHotels... ');
        let filters: string = '';
        if (filterRequest.name) {
            filters = filters + ` AND name like '%${filterRequest.name}%' AND UPPER(name) like '%${filterRequest.name}%'`;
        }
        let starfilter: string = '';
        if (filterRequest.stars) {
            for (const starPa of filterRequest.stars) {
                if (starPa && this.validStars.indexOf(
                    parseInt(filterRequest.stars.toString(), 0)) === -1) {
                    throw new Error('Invlid star parameter');
                } else if (starPa > 0) {
                    starfilter = starfilter + `${starPa},`;
                }
            }
        }
        if (starfilter !== '') {
            filters = filters + ' AND stars in(' + starfilter + '-1)';
        }

        const queryFilter = `SELECT * FROM hotel
                WHERE
                creationdate is not NULL
                ${filters}
                ORDER by creationdate DESC LIMIT 100`;

        logger.log(queryFilter);

        this.sqliteManager.getDb().serialize(() => {
            this.sqliteManager.getDb().all(queryFilter,
                {}, (err, rows) => {
                    if (err) {
                        logger.error('error findFilterHotels... ', err);
                        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
                    } else {
                        logger.info('---> resolve findFilterHotels... ');
                        res.status(HttpStatus.OK).json(rows);
                    }
                });
        });
        return [];
    }
}