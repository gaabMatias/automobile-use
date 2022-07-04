import  { Car, ICarInterface } from '../schemas/car'
import * as uuid  from 'uuid'
import AppError from '../errors/appError'

interface ICarDTO {
  licensePlate: string;
  color: string;
  brand: string;
}

export class CarService {
  public async create(createRequest: ICarDTO): Promise<ICarInterface> {
    const { licensePlate } = createRequest;
    const checkIfCarExists = await Car.findOne({licensePlate}) 

    if(checkIfCarExists) {
      throw new AppError(`${licensePlate} already registered`)
    }

    const newCar = await Car.create({
      _id: uuid.v4(),
      ...createRequest
    })
    return newCar;
  }
}