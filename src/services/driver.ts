import * as uuid  from 'uuid'

import AppError from "../errors/appError";

import { Driver, IDriverInterface } from "../schemas/driver";

export interface IFilterDriver {
  name?: string;
}


export class DriverService {
  public async create(name: string): Promise<IDriverInterface> {
    const checkIfDriverAlreadyExists = await Driver.findOne({name: name})
    if (checkIfDriverAlreadyExists) {
      throw new AppError('Driver already exists!!')
    }
    const uniqueId = uuid.v4()
    const newDriver = await Driver.create({
      _id: uniqueId,
      id: uniqueId,
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
      const findUpdatedDriver = await Driver.findOne({id: checkIfDriverExists.id})
      if(!findUpdatedDriver) {
        throw new AppError('Something went wrong while updating driver')
      }
      return findUpdatedDriver
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