import './util/module-alias';

import { BeachesController } from './controllers/beaches';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';
import { UsersController } from './controllers/users';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  async init(): Promise<void> {
    this.setupExpress();
    this.setupController();
    await this.databaseSetup();
  }

  getApp(): Application {
    return this.app;
  }

  start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening of port:', this.port);
    });
  }

  async close(): Promise<void> {
    await database.close();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupController(): void {
    const forecastController = new ForecastController();
    const beachesController = new BeachesController();
    const userController = new UsersController();
    this.addControllers([
      forecastController,
      beachesController,
      userController,
    ]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }
}
