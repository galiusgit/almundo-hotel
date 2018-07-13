import { Middleware, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

/**
 * EmployeeFindMiddleware
 * @export
 * @class EmployeeFindMiddleware
 * @implements {NestMiddleware}
 */
@Middleware()
export class EmployeeFindMiddleware implements NestMiddleware {

    /**
     * resolve
     * @returns (req, res, next) => {
     * @memberof EmployeeFindMiddleware
     */
    public resolve() {
        return (req: Request | any, res: Response, next: NextFunction) => {
            /*res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header('X-Powered-By', ' 3.2.1');
            res.header('Content-Type', 'application/json;charset=utf-8');*/
            next();
        };
    }
}