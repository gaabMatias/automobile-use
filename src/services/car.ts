import  { Car, ICarInterface } from '../schemas/car'
import * as uuid  from 'uuid'
import AppError from '../errors/appError'

interface ICarDTO {
  licensePlate: string;
  color: string;
  brand: string;
}

interface IUpdateCarDTO {
  id: string;
  color?: string;
  brand?: string;
}

interface IListCarDTO {
  color?: string;
  brand?: string;
}

export class CarService {
  public async create(createRequest: ICarDTO): Promise<ICarInterface> {
    const { licensePlate } = createRequest;
    const checkIfCarExists = await Car.findOne({licensePlate}) 

    if(checkIfCarExists) {
      throw new AppError(`${licensePlate} already registered`)
    }

    const newCar = await Car.create({
      id: uuid.v4(),
      ...createRequest
    })
    return newCar;
  }

  public async delete(id: string): Promise<ICarInterface> {
    const checkIfCarExists = await Car.findOneAndDelete({id})

    if(!checkIfCarExists) {
      throw new AppError('This car does not exists!!')
    }
    return checkIfCarExists
  }

  public async getById(id: string): Promise<ICarInterface> {
    const getCarByUniqueId = await Car.findOne({id})

    if(!getCarByUniqueId) {
      throw new AppError('This car does not exists!!')
    }
    return getCarByUniqueId
  }
  
  public async update(updateRequest: IUpdateCarDTO): Promise<ICarInterface> {
    const {id} = updateRequest
    const checkIfCarExists = await Car.findOneAndUpdate(
      {id}, { $set: {...updateRequest}})
    if(!checkIfCarExists) {
      throw new AppError('This car does not exists!!')
    }

    const findUpdatedCar = await Car.findOne({id})
      if (!findUpdatedCar) {
        throw new Error('something went wrong while updating car')
      }
    return findUpdatedCar
  }
  public async listAndFilter(listRequest: IListCarDTO): Promise<ICarInterface[]> {
    return await Car.find({...listRequest})
  }
}