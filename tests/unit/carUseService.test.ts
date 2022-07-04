
import MongoMock from '../mongo'

import AppError from '../../src/errors/appError'

import { CarUse } from '../../src/schemas/carUse';
import { Driver } from '../../src/schemas/driver';
import { Car } from '../../src/schemas/car';

import { CarUseService } from '../../src/services/carUse';
import { CarService } from '../../src/services/car';
import { DriverService } from './../../src/services/driver';

const carUseService = new CarUseService();
const carService = new CarService();
const driverService = new DriverService();

beforeAll(async () => {
  await MongoMock.connect();
});
beforeEach(async () => {
  await CarUse.deleteMany({});
  await Car.deleteMany({});
  await Driver.deleteMany({});
});
afterAll(async () => {
  await MongoMock.disconnect();
})

describe('create car use unit tests', () => {
  it('Should be able to create a new car use', async () => {
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    const newUse = await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })

    expect(newUse).toBeDefined()
    expect(newUse.driver).toBe(newDriver.id)
  })
  it('Should not be able do use a car which is already in use', async() => {

    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })
    await expect(
      await carUseService.create({
        driverId: newDriver.id,
        carId: newCar.id,
        reason: 'deliver a package'
      })
    ).rejects.toBeInstanceOf(AppError)

  })
  it('A driver Should not be able to use 2 cars at the same time', async () => {
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })
    const newCar2 = await carService.create({
      licensePlate: 'NVM44A',
      color: '#D973DB',
      brand: 'NISSAN'
    })

    await expect(
      await carUseService.create({
        driverId: newDriver.id,
        carId: newCar2.id,
        reason: 'deliver a package'
      })
    ).rejects.toBeInstanceOf(AppError)
  });
})


describe('list car uses unit tests', () => {
  it('Should list all car uses showing driver and car details', async () => {
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })
    const newCar2 = await carService.create({
      licensePlate: 'NVM44A',
      color: '#D973DB',
      brand: 'NISSAN'
    })
    const newDriver2 = await driverService.create('GEORGE DOE')

    await carUseService.create({
      driverId: newDriver2.id,
      carId: newCar2.id,
      reason: 'go for a road trip'
    })
    const list = await carUseService.findUses()
    expect(list.length).toBe(2)
    expect(list[1].reason).toBe('go for a road trip')
  })
  it('should return an empty array if there is no uses', async () => {
    const list = await carUseService.findUses()
    expect(list.length).toBe(0)
  })
})

describe('finish car use unit tests', () => {
  it('Should be able to finish a car use car', async () => {
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    const carUse = await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })
    const finishUse = await carUseService.finishUse(carUse.id)
    expect(finishUse).toBeDefined()
    expect(finishUse.endDate).toBeDefined()
  })
  it('should allow the driver and the car to be in another use after finishing', async () => {
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const newDriver = await driverService.create('JOHN DOE')

    const carUse = await carUseService.create({
      driverId: newDriver.id,
      carId: newCar.id,
      reason: 'deliver a package'
    })
    await carUseService.finishUse(carUse.id)

    const newCar2 = await carService.create({
      licensePlate: 'NVM44A',
      color: '#D973DB',
      brand: 'NISSAN'
    })
    const carUse2 = await carUseService.create({
      driverId: newDriver.id,
      carId: newCar2.id,
      reason: 'go for a roadtrip'
    })
    expect(carUse2).toBeDefined()
    expect(carUse2.driver).toBe(newDriver.id)
  })
  it('Should not be able to finish a use that do not exists', async () => {
    await expect(await carUseService.finishUse('0001')).rejects.toBeInstanceOf(AppError)
  })
})