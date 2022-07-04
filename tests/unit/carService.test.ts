import { Car } from '../../src/schemas/car';
import MongoMock from '../mongo'
import AppError from '../../src/errors/appError'
import { CarService } from '../../src/services/car';
describe('create car unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  beforeEach(async () => {
    await Car.deleteMany({});
  });
  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to create a new car', async () => {
    const newCar = {
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    }

    const carService = new CarService();
    const car = await carService.create(newCar);

    expect(car).toBeDefined();
    expect(car.licensePlate).toBe(newCar.licensePlate);
  })
  it('should not be able to create 2 cars with the same licensePlate',async () => {
    const newCar = {
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    } 
    const fakeCar = {
      licensePlate: 'C38320N',
      color: '#FEDDF8',
      brand: 'NISSAN'
    }
    const carService = new CarService();
      await carService.create(newCar);
      await expect(carService.create(fakeCar)).rejects.toBeInstanceOf(AppError)
  })
})
describe('', async () => {
  
})