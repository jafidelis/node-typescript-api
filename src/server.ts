import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { ForecastController } from './controllers/forecast';
import { Application } from 'express';

export class SetupServer extends Server {
    constructor(private port = 3000) {
        super();
    }

    init(): void {
        this.setupExpress();
        this.setupController();
    } 

    getApp(): Application {
        return this.app;
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    private setupController(): void {
        const forecastController = new ForecastController();
        this.addControllers([forecastController]);
    }
}