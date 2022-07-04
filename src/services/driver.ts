import * as uuid  from 'uuid'

import AppError from "../errors/appError";

import { Driver, IDriverInterface } from "../schemas/driver";

interface IFilterDriver {
  name?: string;
}


export class DriverService {
  public async create(name: string): Promise<IDriverInterface> {
    const checkIfDriverAlreadyExists = await Driver.findOne({name: name})
    if (checkIfDriverAlreadyExists) {
      throw new AppError('Driver already exists!!')
    }

    const newDriver = await Driver.create({
      id: uuid.v4(),
      name
    })
    return newDriver
  }
  public async update(id: string, name: string): Promise<IDriverInterface> {
    const checkIfDriverExists = await Driver.findOneAndUpdate(
      {id}, { $set: {name}})
      if(!checkIfDriverExists) {
        throw new AppError('Driver does not exists!!')
      }
      const findUpdatedCar = await Driver.findOne({id: checkIfDriverExists.id})
      if(!findUpdatedCar) {
        throw new AppError('Something went wrong while updating driver')
      }
      return findUpdatedCar
  }
  public async delete(id: string): Promise<IDriverInterface> {
    const checkIfDriverExists = await Driver.findOneAndDelete({id})
    if(!checkIfDriverExists) {
      throw new AppError('Driver does not exists!!')
    }
    return checkIfDriverExists
  }

  public async getById(id: string): Promise<IDriverInterface> {
    const findDriverById = await Driver.findOne({id})
    if(!findDriverById) {
      throw new AppError('Driver does not exists!!')
    }
    return findDriverById
  }
  public async listAndFilter(listRequest: IFilterDriver): Promise<IDriverInterface[]> {
    const listDrivers = await Driver.find({...listRequest})
    return listDrivers
  }
}