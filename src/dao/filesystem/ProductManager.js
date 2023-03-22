import { readFile, writeFile } from 'fs/promises';

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  // GET All Products
  getProducts = async (limit) => {
    try {
      if (limit !== undefined) {
        const products = await JSON.parse(await readFile(this.path));
        return await products.filter((p) => p.id <= parseInt(limit));
      }
      return await JSON.parse(await readFile(this.path));
    } catch (err) {
      console.log(err);
    }
  };

  // Get Single Product
  getSingleProduct = async (pid) => {
    try {
      const products = await JSON.parse(await readFile(this.path));
      const exists = await products.some((p) => p.id === parseInt(pid));
      if (exists) {
        return await products.filter((p) => p.id === parseInt(pid));
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Add product
  addProduct = async (productData) => {
    try {
      if (productData.id)
        return {
          msg: "Denied. You can't use ID property",
        };

      const productsDB = await JSON.parse(await readFile(this.path));
      const newProduct = {
        id: productsDB.length + 1,
        ...productData,
      };
      productsDB.push(newProduct);
      const newProductAdded = JSON.stringify(productsDB);
      await writeFile(this.path, newProductAdded);
      return { msg: 'New product added successfully' };
    } catch (err) {
      console.log(err);
    }
  };

  // Update product
  updateProduct = async (pid, productData) => {
    try {
      if (productData.id)
        return {
          msg: "Denied. You can't use ID property",
        };

      const productsDB = await JSON.parse(await readFile(this.path));
      const exists = await productsDB.some((p) => p.id === parseInt(pid));
      if (exists) {
        const updateItem = await productsDB.map((p) =>
          p.id === parseInt(pid) ? { ...p, ...productData } : p
        );
        const productUpdated = JSON.stringify(updateItem);
        await writeFile(this.path, productUpdated);
        return { msg: 'The product was updated successfully' };
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete product
  deleteProduct = async (pid) => {
    try {
      const productsDB = await JSON.parse(await readFile(this.path));
      const exists = await productsDB.some((p) => p.id === parseInt(pid));
      if (exists) {
        const deleted = await productsDB.filter((p) => p.id !== parseInt(pid));
        const productDel = JSON.stringify(deleted);
        await writeFile(this.path, productDel);
        return { msg: 'The product was deleted successfully' };
      } else {
        return { msg: 'The product not exists' };
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default ProductManager;
