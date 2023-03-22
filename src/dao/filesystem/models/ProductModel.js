import ProductManager from '../ProductManager.js';
import { resolve } from 'path';
import __dirname from '../../../utils.js';

const adminProducts = new ProductManager(
  resolve(__dirname, 'files', 'productList.json')
);

// Get all products
const getProducts = (limit) => {
  return adminProducts.getProducts(limit);
};

// Get single products
const getSingleProduct = (pid) => {
  return adminProducts.getSingleProduct(pid);
};

// Add product
const addProduct = (productData) => {
  return adminProducts.addProduct(productData);
};

// Update product
const updateProduct = (pid, productData) => {
  return adminProducts.updateProduct(pid, productData);
};

// Delete product
const deleteProduct = (pid) => {
  return adminProducts.deleteProduct(pid);
};

export {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
