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

describe('delete car unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Car.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });
  it('should be able to delete a car', async () => {
    const carService = new CarService();
    const car = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    }); 
    const deletedCar = await carService.delete(car.id)

    expect(deletedCar).toBeDefined()
    expect(deletedCar.id).toBe(car.id)
  })
  it('should not be able to delete a non existent car', async () => {
    const carService = new CarService();

    await expect(carService.delete('001')).rejects.toBeInstanceOf(AppError);
  })
})

describe('Get car by unique id unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Car.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });
  it('should be able to search for a car by unique id', async () => {
    const carService = new CarService();
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })

    const getCar = await carService.getById(newCar.id)

    expect(getCar).toBeDefined()
    expect(getCar.licensePlate).toBe(newCar.licensePlate)
  })
  it('Should throw a new error if the id is not valid', async() => {
    const carService = new CarService();

    await expect(carService.getById('001')).rejects.toBeInstanceOf(AppError);
  })
})

describe('Update car unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Car.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });
  
  it('should be able to update a car based on user request', async () => {
    const carService = new CarService();
    const newCar = await carService.create({
      licensePlate: 'C38320N',
      color: '#02AEDF',
      brand: 'FORD'
    })
    const updatedCar = await carService.update({
      id: newCar.id,
      color: '#FEDDF8'
    })

    expect(updatedCar).toBeDefined()
    expect(updatedCar.color).toBe('#FEDDF8')
    expect(updatedCar.id).toBe(newCar.id)
  })
  it('should not be able to update a non existent car', async () => {
    const carService = new CarService();
    await expect(carService.update({
      id: '001',
      brand: 'PORSCHE'
    })).rejects.toBeInstanceOf(AppError)
  })
})

describe('List cars unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });

  beforeEach(async () => {
    await Car.deleteMany({});
  });

  afterAll(async () => {
    await MongoMock.disconnect();
  });

it('Should return a list of cars', async () => {
  const carService = new CarService();
  const car1 = await carService.create({
    licensePlate: 'C38320N',
    color: '#02AEDF',
    brand: 'FORD'
  })
  await carService.create({
    licensePlate: 'HCL1164',
    color: '#8A84BE',
    brand: 'ASTON MARTIN'
  })
  await carService.create({
    licensePlate: '6DKC037',
    color: '#FEDDF8',
    brand: 'NISSAN'
  })
  const listCars = await carService.listAndFilter({});
  expect(listCars.length).toBe(3);
  expect(listCars[0].licensePlate).toBe(car1.licensePlate);
})

it('Should return a list of cars filtered by brand', async () => {
  const carService = new CarService();
  const car1 = await carService.create({
    licensePlate: 'C38320N',
    color: '#02AEDF',
    brand: 'FORD'
  })
  await carService.create({
    licensePlate: 'HCL1164',
    color: '#8A84BE',
    brand: 'ASTON MARTIN'
  })
  await carService.create({
    licensePlate: '6DKC037',
    color: '#FEDDF8',
    brand: 'NISSAN'
  })
  await carService.create({
    licensePlate: 'EAW4520',
    color: '#FEDDF8',
    brand: 'FORD'
  })
  const listCars = await carService.listAndFilter({
    brand: 'FORD'
  });
  expect(listCars.length).toBe(2);
  expect(listCars[0].brand).toBe(car1.brand);
})

it('should return an empty list if there is no cars', async () => {
  const carService = new CarService();
  const listCars = await carService.listAndFilter({})
  expect(listCars.length).toBe(0)
})
})