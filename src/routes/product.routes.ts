import { Router } from 'express';
import deleteProducts from '../controllers/deleteProduct';
import getProducts from '../controllers/getProducts';
import getProductsDeleted from '../controllers/getProductsDeleted';
import postProducts from '../controllers/postProduct';
import updateProduct from '../controllers/updateProduct';
const productRoute = Router();

productRoute.get('/', getProducts);
productRoute.post('/', postProducts);
productRoute.delete('/:id', deleteProducts);
productRoute.put('/', updateProduct);
productRoute.get('/deleted', getProductsDeleted);

export default productRoute;
