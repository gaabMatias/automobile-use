import { Router } from 'express';
import { CarController } from '../controllers/car';


const router = Router();

const carController = new CarController();

router.post('/create', carController.createCar);
router.put('/update', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.get('/list', carController.list)
router.get('/:id', carController.getCar);


export default router;