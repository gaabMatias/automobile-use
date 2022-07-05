import { Request, Response } from 'express';
import { CarService, ICarDTO } from "../services/car";


export class CarController {
  public async createCar(request: Request, response: Response) {
    const createCarRequest: ICarDTO = request.body
    const carService = new CarService();
    try { 
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
}