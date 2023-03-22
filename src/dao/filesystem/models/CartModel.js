import CartManager from '../CartManager.js';
import { resolve } from 'path';
import __dirname from '../../../utils.js';

const adminCarts = new CartManager(resolve(__dirname, 'files', 'carrito.json'));

// Add new cart
const addCart = () => {
  return adminCarts.addCart();
};

// Get products from a specific cart
const getCartProducts = (cid) => {
  return adminCarts.getCartProducts(cid);
};

// Add products to a specific cart
const addProductsToCart = (cid, pid) => {
  return adminCarts.addProductsToCart(cid, pid);
};

export { addCart, getCartProducts, addProductsToCart };
