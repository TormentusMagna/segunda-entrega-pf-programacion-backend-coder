import { Router } from 'express';
import * as cartControllers from '../controllers/cartControllers.js';

const router = Router();

router.post('/api/carts', cartControllers.addCart);
router.get('/api/carts/:cid', cartControllers.getCartProducts);
router.post('/api/carts/:cid/products/:pid', cartControllers.addProductsToCart);

export default router;
