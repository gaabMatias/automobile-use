import { Router } from 'express';
import { DriverController } from "../controllers/driver";

const router = Router();

const driversController  = new DriverController()

router.post('/create', driversController.registerDriver)
router.get('/list', driversController.listAndFilterDrivers)
router.put('/:id', driversController.updateDriver)
router.delete('/:id', driversController.deleteDriver)
router.get('/:id', driversController.getDriverById)


export default router