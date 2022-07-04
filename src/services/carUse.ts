import { format } from "date-fns";
import AppError from "../errors/appError";
import { Car } from "../schemas/car";
import { CarUse, ICarUseInterface } from "../schemas/carUse";
import { Driver } from "../schemas/driver";

interface ICreateUseDTO {
  driverId: string;
  carId: string;
  reason: string;
}
export class CarUseService {

  public async create(createUse: ICreateUseDTO): Promise<ICarUseInterface> {
    const {carId, driverId, reason} = createUse
    const checkCar = await Car.findOne({id: carId})
    const checkDriver = await Driver.findOne({id: driverId})
    if(!checkCar || !checkDriver) {
      throw new AppError('Car or Driver does not exist')
    }
    const checkCarAvailability = await CarUse.findOne({car: carId})
    const checkDriverAvailability = await CarUse.findOne({driver: driverId})
    if(checkCarAvailability) {
      throw new AppError('Car is not available at the moment')
    }
    if(checkDriverAvailability) {
      throw new AppError('Driver is not available at the moment')
    }
    const formattedDate = format(new Date(), 'dd/LL/yyyy')

    const newUse = await CarUse.create({
      driver: checkDriver.id,
      car: checkCar.id,
      startDate: formattedDate,
      reason,
    })
    return newUse;
  }

  public async findUses(): Promise<ICarUseInterface[]> {

  }
  public async finishUse(id: string): Promise<ICarUseInterface> {

  }
}