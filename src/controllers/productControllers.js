import * as productModels from '../dao/filesystem/models/ProductModel.js';
import { ProductModel } from '../dao/db/models/ProductModel.js';

// Get all products
const getProducts = async (req, res) => {
  try {
    let { limit } = req.query;
    // Filesystem ACTION
    // const products = await productModels.getProducts(limit);
    // return res.status(200).json(products);

    // Mongoose ACTION
    if (limit === undefined || limit >= '10' || limit === '' || limit === '0') {
      limit = 10;
    }
    const products = await ProductModel.find().select('-__v').limit(limit);
    // const respu = {
    //   status: 'success / error',
    //   payload: [products],
    //   totalPages: 'Total de páginas',
    //   prevPage: 'Página anterior',
    //   nextPage: 'Página siguiente',
    //   page: 'Página actual',
    //   hasPrevPage: 'Indicador para saber si la página previa existe',
    //   hasNextPage: 'Indicador para saber si la página siguiente existe',
    //   prevLink: 'Link directo a la página previa (null si hasPrevPage=false)',
    //   nextLink:
    //     'Link directo a la página siguiente (null si hasNextPage=false)',
    // };
    return res.status(200).json({ status: 'success', payload: products });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', payload: `${err}` });
  }
};

// Get single product
const getSingleProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    // Filesystem ACTION
    // const product = await productModels.getSingleProduct(pid);
    // product.msg === 'The product not exists'
    //   ? res.status(404).json(product)
    //   : res.status(200).json(product);

    // Mongoose ACTION
    const product = await ProductModel.findById({ _id: pid }).select('-__v');
    return res.status(200).json({ status: 'success', payload: product });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ status: 'error', payload: `${err}` });
  }
};

// Add product
const addProduct = async (req, res) => {
  try {
    const productData = req.body;
    // Filesystem ACTION
    // const newProduct = await productModels.addProduct(productData);
    // newProduct.msg === "Denied. You can't use ID property"
    //   ? res.status(406).json(newProduct)
    //   : res.status(201).json(newProduct);

    // Mongoose ACTION
    if (productData.id || productData._id)
      return res.status(406).json({
        status: 'error',
        payload: "Denied. You can't use ID property",
      });

    const newProduct = await ProductModel.create(productData);
    return res
      .status(201)
      .json({ status: 'success', payload: 'New product added successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', payload: `${err}` });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    // filesystem ACTION
    // const newProductData = await productModels.updateProduct(pid, productData);
    // newProductData.msg === 'The product not exists'
    //   ? res.status(404).json(newProductData)
    //   : res.status(201).json(newProductData);

    // Mongoose ACTION
    if (productData.id || productData._id)
      return res.status(406).json({
        status: 'error',
        payload: "Denied. You can't use ID property",
      });

    const newProductData = await ProductModel.findByIdAndUpdate(
      { _id: pid },
      productData
    );
    return res
      .status(201)
      .json({ status: 'success', payload: 'Product updated successfully' });
  } catch (err) {
    return res.status(500).json({ status: 'error', payload: `${err}` });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    // Filesystem ACTION
    // const productDeleted = await productModels.deleteProduct(pid);
    // productDeleted.msg === 'The product not exists'
    //   ? res.status(404).json(productDeleted)
    //   : res.status(200).json(productDeleted);

    // Mongoose ACTION
    const productDeleted = await ProductModel.findByIdAndDelete({ _id: pid });
    return res
      .status(200)
      .json({ status: 'success', payload: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', payload: `${err}` });
  }
};

export {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
