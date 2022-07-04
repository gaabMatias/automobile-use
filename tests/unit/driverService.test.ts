
import { Driver } from '../../src/schemas/driver';
import MongoMock from '../mongo'
import AppError from '../../src/errors/appError'
import { DriverService } from '../../src/services/driver';


describe('register driver unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  beforeEach(async () => {
    await Driver.deleteMany({});
  });
  afterAll(async () => {
    await MongoMock.disconnect();
  });

  it('should be able to register a new driver', async () => {
      const newDriverName = 'JOHN DOE'


    const driverService = new DriverService();
    const driver = await driverService.create(newDriverName);

    expect(driver).toBeDefined();
    expect(driver.name).toBe(newDriverName);
  })
  it('should not be able to create 2drivers with the same licensePlate',async () => {
    const newDriverName = 'JOHN DOE'
    const fakeDriverName = 'JOHN DOE' 
    const driverService = new DriverService();

      await driverService.create(newDriverName);
      await expect(driverService.create(fakeDriverName)).rejects.toBeInstanceOf(AppError)
  })

  describe('Update driver unit tests', () => {
    beforeAll(async () => {
      await MongoMock.connect();
    });
    beforeEach(async () => {
      await Driver.deleteMany({});
    });
    afterAll(async () => {
      await MongoMock.disconnect();
    });

    it('Should be able to update a driver by his unique ID', async () => {
      const newDriverName = 'JOHN DOE'


    const driverService = new DriverService();
    const driver = await driverService.create(newDriverName);
    const updatedDriver = await driverService.update(driver.id, 'Éanna Durk Van Rompaey');

    expect(updatedDriver).toBeDefined();
    expect(updatedDriver.name).toBe('Éanna Durk Van Rompaey');
    })
    it('Should not be able to update a non registered driver', async () => {
      const driverService = new DriverService();
      await expect(driverService.update('0001', 'Éanna Durk Van Rompaey')).rejects.toBeInstanceOf(AppError)
    })
  })

  describe('Delete driver unit tests', () => {
    beforeAll(async () => {
      await MongoMock.connect();
    });
    beforeEach(async () => {
      await Driver.deleteMany({});
    });
    afterAll(async () => {
      await MongoMock.disconnect();
    });

    it('Should be able to delete a driver by his unique ID', async () => {
      const newDriverName = 'JOHN DOE'


    const driverService = new DriverService();
    const driver = await driverService.create(newDriverName);
    const deletedDriver = await driverService.delete(driver.id)

    expect(deletedDriver).toBeDefined();
    expect(deletedDriver.name).toBe(newDriverName);
    })
    it('Should not be able to delete a non registered driver', async () => {
      const driverService = new DriverService();
      await expect(driverService.delete('0001')).rejects.toBeInstanceOf(AppError)
    })
  })
})

describe('Get driver by unique ID unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  beforeEach(async () => {
    await Driver.deleteMany({});
  });
  afterAll(async () => {
    await MongoMock.disconnect();
  })

  it('Should be able to return a driver by his unique ID', async () => {
    const driverService = new DriverService();
    const newDriver = await driverService.create('JOHN DOE')
    const getById = await driverService.getById(newDriver.id)

    expect(getById).toBeDefined()
    expect(getById.name).toBe('JOHN DOE')
  })

  it('Should not return a non existent driver', async () => {
    const driverService = new DriverService();
    await expect(driverService.getById('001')).rejects.toBeInstanceOf(AppError)
  })
})

describe('List and Filter drivers unit tests', () => {
  beforeAll(async () => {
    await MongoMock.connect();
  });
  beforeEach(async () => {
    await Driver.deleteMany({});
  });
  afterAll(async () => {
    await MongoMock.disconnect();
  })
  it('Should return a list of all drivers registered', async () => {
    const driverService = new DriverService();

    const driverName1 = await driverService.create('JOHN DOE')

    await driverService.create('Éanna Durk Van Rompaey')
    await driverService.create('Zeke Rupert Elder')
    await driverService.create('Ferdinand Caelan Baier')

    const listDrivers = await driverService.listAndFilter({});

    expect(listDrivers).toBeDefined();
    expect(listDrivers.length).toBe(4)
    expect(listDrivers[0].name).toBe(driverName1.name)
  })
  it('should return a empty array if there is no registered driver', async () => {
    const driverService = new DriverService();
    const listDrivers = await driverService.listAndFilter({});
    expect(listDrivers).toBeDefined();
    expect(listDrivers.length).toBe(0);
  })
  it('Should return only drivers that Match the Filter', async () => {
    const driverService = new DriverService();

    const driverName1 = await driverService.create('JOHN DOE')
    const driverName2 = await driverService.create('JOHN STEWART')

    await driverService.create('Éanna Durk Van Rompaey')
    await driverService.create('Zeke Rupert Elder')
    await driverService.create('Ferdinand Caelan Baier')

    const listDrivers = await driverService.listAndFilter({name: 'JOHN DOE'})

    expect(listDrivers).toBeDefined(); 
    expect(listDrivers.length).toBe(1);
  })
})