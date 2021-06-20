import { Forecast } from '@src/services/forecast';
import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { Beach } from '@src/models/beach';
import { authMiddleware } from '@src/middlewares/auth';

const forecast = new Forecast();

@Controller('forecast')
@ClassMiddleware(authMiddleware)
export class ForecastController {
  @Get('')
  async getForecastForLoggedUser(req: Request, resp: Response): Promise<void> {
    try {
      const beaches = await Beach.find({ user: req.decoded?.id });
      const forecastData = await forecast.processForecastForBeaches(beaches);
      resp.status(200).send(forecastData);
    } catch (error) {
      console.error(error);
      resp.status(500).send({ error: 'Something went wrong' });
    }
  }
}
