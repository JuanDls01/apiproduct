import { Router } from 'express';
import brandRoute from './brand.routes';
import productRoute from './product.routes';

const mainRouter = Router();

mainRouter.use('/product', productRoute);
mainRouter.use('/brand', brandRoute)

export default mainRouter;