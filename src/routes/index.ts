import { Router } from 'express';
import CarRouter from './car';
import DriverRouter from './driver'
import CarUseRouter from './carUse'


const routes = Router();

routes.use('/car', CarRouter);
routes.use('/driver', DriverRouter)
routes.use('/car-use', CarUseRouter)


export default routes;