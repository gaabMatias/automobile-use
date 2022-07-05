import { Request, Response } from 'express';
import { CarUseService, ICreateUseDTO } from './../services/carUse';


export class CarUseController {

  public async create(request: Request, response: Response) {
    const requestBody: ICreateUseDTO = request.body
    const carUseService = new CarUseService();
    try{ 
      const responseBody = await carUseService.create(requestBody)
      return response.json(responseBody);
    } catch (error) {
      return response.json(error);
    }
  }
  public async listUseCases(request: Request, response: Response) {
    const carUseService = new CarUseService();
    try {
      const responseBody = await carUseService.findUses()
      return response.json(responseBody)
    } catch (error) {
      return response.json(error)
    }
  }
  public async finishUse(request: Request, response: Response) {
    const { id } = request.params
    const carUseService = new CarUseService();
    try {
      const responseBody = await carUseService.finishUse(id);
      return response.json(responseBody)
    }catch(error) {
      return response.json(error)
    }
  }
}