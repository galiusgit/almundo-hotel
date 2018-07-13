// general imports
import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AppHotelApiModule } from './app.hotel.api.module';
import { Logger } from '@nestjs/common/services/logger.service';
import { Express } from 'express';
// middleware imports
import express = require('express');
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';

/**
 * loggerServerApp
 */
const loggerServerApp = new Logger('ServerApp');

/**
 * ServerApp
 * ----------------------------- comands --------------------------------
 * node ./node_modules/tsoa swagger
 * @export
 * @class ServerApp
 */
export class ServerApp {

  /**
   * MAIN_PORT
   * @static
   * @type {number}
   * @memberof ServerApp
   */
  public static MAIN_PORT: number = 3000;

  /**
   * expressInstance
   * @private
   * @type {Express}
   * @memberof ServerApp
   */
  private expressInstance: Express;

  /**
   * Nest application options.
   * @private
   * @type {NestApplicationOptions}
   * @memberof ServerApp
   */
  private nestApplicationOptions: NestApplicationOptions = {
    bodyParser: true,
  };

  /**
   * Creates an instance of ServerApp.
   * @memberof ServerApp
   */
  constructor() {
    this.expressInstance = this.buildExpressInstance();
    const initPromise = this.initNestApp();
    initPromise.catch(() => {
      // ----- TODO: implements loggger
    });
  }

  /**
   * Builds the express instance
   * @private
   * @returns {Express} expressInstance
   * @memberof ServerApp
   */
  private buildExpressInstance(): Express {
    // configure middleware on express instance
    const expressInstance = express();
    expressInstance.use(bodyParser.urlencoded({ extended: true }));
    expressInstance.use(bodyParser.json());
    expressInstance.use(cors());
    expressInstance.use(methodOverride());
    expressInstance.listen(ServerApp.MAIN_PORT);
    // inital url
    expressInstance.get('/', (req, res) => {
      res.send('The service is running: ' + req.baseUrl);
    });
    return expressInstance;
  }

  /**
   * Init the nest app.
   * @private
   * @param {Express} expressInstance
   * @memberof ServerApp
   */
  private async initNestApp() {

    const app = await NestFactory.create(AppHotelApiModule,
      this.expressInstance, this.nestApplicationOptions);
    // this.bootstrapSwagger();
    this.addRoutesForExternalDocs();
    // init server app
    const promise = app.init();
    promise.then(() => loggerServerApp.log('The service application is listening on port ' + ServerApp.MAIN_PORT));
    promise.catch(() => loggerServerApp.error('The service application Failed...'));
  }

  /**
   * Bootstrap swagger.
   * @private
   * @param {Express} expressInstance
   * @memberof ServerApp
   */
  /*private bootstrapSwagger(): void {
    const swaggerDocsRoute = '/docs';
    this.expressInstance.use(swaggerDocsRoute, express.static(__dirname + '/swagger-ui'));
    loggerServerApp.log('Init route documentation: ' + swaggerDocsRoute);
    this.expressInstance.use('/swagger.json', (req, res) => {
      loggerServerApp.log('Gets the swagger.json file: ' + req.baseUrl);
      res.sendFile(__dirname + '/swagger.json');
    });
    loggerServerApp.log('Init the swagger routes configuration...');
  }*/

  /**
   * Adds the routes for external documentations
   * @private
   * @memberof ServerApp
   */
  private addRoutesForExternalDocs(): void {
    // static docs URL's
    const tsDocsRoute = '/ts-docs';
    this.expressInstance.use(tsDocsRoute, express.static(__dirname + '/ts-docs'));
    loggerServerApp.log('Init route documentation: ' + tsDocsRoute);
    // TODO: falta implementar documentación autogenerada para README.md y RELAESE.md por versión
    // expressInstance.use('/ts-markdown', express.static(__dirname + '/ts-markdown'));
    const jsDocsRoute = '/js-docs';
    this.expressInstance.use(jsDocsRoute, express.static(__dirname + '/js-docs'));
    loggerServerApp.log('Init route documentation: ' + jsDocsRoute);
    loggerServerApp.log('Init the routes for external documentations...');
  }
}
new ServerApp();