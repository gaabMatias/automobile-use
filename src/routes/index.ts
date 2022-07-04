import { Router } from 'express';
import CarController from '../controllers/car';


const routes = Router();

routes.use('/car', CarController);


export default routes;