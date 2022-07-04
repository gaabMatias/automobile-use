import { format } from "date-fns";
import * as uuid  from 'uuid'
import AppError from "../errors/appError";
import { Car, ICarInterface } from "../schemas/car";
import { CarUse, ICarUseInterface } from "../schemas/carUse";
import { Driver, IDriverInterface } from "../schemas/driver";

export interface ICreateUseDTO {
  driverId: string;
  carId: string;
  reason: string;
}
export class CarUseService {

  public async create(createUse: ICreateUseDTO): Promise<ICarUseInterface> {
    const {carId, driverId, reason} = createUse
    const checkCar = await Car.findOne({
      id: carId
    })
    const checkDriver = await Driver.findOne({id: driverId})
    if(!checkCar || !checkDriver) {
      throw new AppError('Car or Driver does not exist')
    }
    const checkCarAvailability = await CarUse.findOne({car: carId})
    const checkDriverAvailability = await CarUse.findOne({driver: driverId, endDate: undefined})
    if(checkCarAvailability) {
      throw new AppError('Car is not available at the moment')
    }
    if(checkDriverAvailability) {
      throw new AppError('Driver is not available at the moment')
    }
    const formattedDate = format(new Date(), 'dd/LL/yyyy')

    const newUse = await CarUse.create({
      id: uuid.v4(),
      driver: checkDriver.id,
      car: checkCar.id,
      startDate: formattedDate,
      reason,
    })
    return newUse;
  }

  public async findUses(): Promise<ICarUseInterface[]> {
    const carUses = await CarUse.find()
    .populate({
      path: 'driver',
      model: 'Driver',
      match: { id: { $gte: 'driver'}},
      select: '-createdAt -updatedAt -__v -id',
    })
    .populate({
      path: 'car',
      model: 'Car',
      match: { id: { $gte: 'car'}},
      select: '-createdAt -updatedAt -__v -id',
    })
    return carUses;
  }
  public async finishUse(id: string): Promise<ICarUseInterface> {
    const driver = await Driver.findOne({ id: id },);
    const formattedDate = format(new Date(), 'dd/LL/yyyy')
    if (!driver) {
      throw new AppError('Driver does not exist.');
    }

    const carUse = await CarUse.findOneAndUpdate(
      {
        driver: id,
        endDate: undefined,
      },
      {
        endDate: formattedDate,
      },
      {
        new: true,
      },
    );

    if (!carUse) {
      throw new AppError('Driver is not using any automobile.');
    }

    return carUse;
  }
  }