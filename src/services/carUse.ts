import { ICarUseInterface } from "../schemas/carUse";

interface ICreateUseDTO {
  driverId: string;
  carId: string;
  reason: string;
}
export class CarUseService {
  public async create(createUse: ICreateUseDTO): Promise<ICarUseInterface> {

  }

  public async findUses(id: string): Promise<ICarUseInterface[]> {

  }
  public async finishUse(id: string): Promise<ICarUseInterface> {

  }
}