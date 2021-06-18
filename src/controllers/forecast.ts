import { Forecast } from '@src/services/forecast';
import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';

const forecast = new Forecast();

@Controller('forecast')
export class ForecastController {
  @Get('')
  async getForecastForLoggedUser(_: Request, resp: Response): Promise<void> {
    try {
      const beaches = await Beach.find({});
      const forecastData = await forecast.processForecastForBeaches(beaches);
      resp.status(200).send(forecastData);
    } catch (error) {
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }
}
