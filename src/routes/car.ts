import { Router } from 'express';
import { CarController } from '../controllers/car';


const router = Router();

const carController = new CarController();

router.post('/create', carController.createCar);
router.delete('/:id', carController.deleteCar);
router.get('/:id', carController.getCar);

export default router;