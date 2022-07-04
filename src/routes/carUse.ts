import { Router } from 'express';
import { CarUseController } from '../controllers/carUse';

const router = Router();
const carUseController = new CarUseController();

router.post('/create', carUseController.create)
router.put('/finish', carUseController.finishUse)
router.get('/list', carUseController.listUseCases)

export default router