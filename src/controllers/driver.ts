import { Request, Response } from "express";
import { DriverService, IFilterDriver } from "../services/driver";
import { driverValidation } from "../yup/validation";


export class DriverController {
  public async registerDriver(request: Request, response: Response){
    const name = request.body;
    const driverService = new DriverService();
    try {
      await driverValidation.validate(name, {abortEarly: true})
      const responseBody = await driverService.create(name)
      response.json(responseBody);
    }  catch (error) {
      response.json(error)
    }
  }
  public async updateDriver(request: Request, response: Response) {
    const {id} = request.params;
    const name = request.body;
    const driverService = new DriverService();
    try {
      const responseBody = await driverService.update(id , name)
      response.json(responseBody);
    }  catch (error) {
      response.json(error)
    }
  }
  
  public async deleteDriver(request: Request, response: Response) {
    const { id } = request.params;
    const driverService = new DriverService();
    try {
      const responseBody = await driverService.delete(id)
      response.json(responseBody);
    }  catch (error) {
      response.json(error)
    }
  }

  public async getDriverById(request: Request, response: Response) {
    const { id } = request.params;
    const driverService = new DriverService();
    try {
      const responseBody = await driverService.getById(id)
      response.json(responseBody);
    }  catch (error) {
      response.json(error)
    }
  }

  public async listAndFilterDrivers(request: Request, response: Response) {
    const requestFilter: IFilterDriver = request.query
    const driverService = new DriverService();
    try {
      const responseBody = await driverService.listAndFilter(requestFilter)
      response.json(responseBody);
    }  catch (error) {
      response.json(error)
    }
  }
}