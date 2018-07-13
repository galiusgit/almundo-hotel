import { Middleware, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

/**
 * EmployeeFindMiddleware
 * @export
 * @class HotelFindMiddleware
 * @implements {NestMiddleware}
 */
@Middleware()
export class HotelFindMiddleware implements NestMiddleware {

    /**
     * resolve
     * @returns (req, res, next) => {
     * @memberof EmployeeFindMiddleware
     */
    public resolve() {
        return (req: Request | any, res: Response, next: NextFunction) => {
            res.header('Content-Type', 'application/json;charset=utf-8');
            next();
        };
    }
}