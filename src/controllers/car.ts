import { Request, Response } from 'express';
import { CarService, ICarDTO, IListCarDTO, IUpdateCarDTO } from "../services/car";
import { carValidation } from '../yup/validation'

export class CarController {
  public async createCar(request: Request, response: Response) {
    const createCarRequest: ICarDTO = request.body
    const carService = new CarService();
    try { 
      await carValidation.validate(createCarRequest, {abortEarly: true})
      const responseBody = await carService.create(createCarRequest)
      return response.json(responseBody)
    } catch (error) {
      response.json(error)
    }
  }

  public async deleteCar(request: Request, response: Response) {
    const { id } = request.params;
    const carService = new CarService();
    try {
      const responseBody = await carService.delete(id);
      return response.json(responseBody)
    } catch (error) {
      response.json(error)
    }
  }

  public async updateCar(request: Request, response: Response) {
    const requestUpdate: IUpdateCarDTO = request.body
    const carService = new CarService();
    try {
      const responseBody = await carService.update(requestUpdate);
      return response.json(responseBody)
    } catch (error) {
      response.json(error)
    }
  }

  public async getCar(request: Request, response: Response) {
    const { id } = request.params;
    const carService = new CarService();
    try {
      const responseBody = await carService.getById(id);
      return response.json(responseBody)
    } catch (error) {
      response.json(error)
    }
  }

  public async list(request: Request, response: Response) {
    const requestQuery = request.query as unknown
    console.log('aqui')
    const carService = new CarService();
    try{
      const responseBody = await carService.listAndFilter(requestQuery as IListCarDTO);
      return response.json(responseBody)
    } catch (error) {
      response.json(error)
    }
  }
}