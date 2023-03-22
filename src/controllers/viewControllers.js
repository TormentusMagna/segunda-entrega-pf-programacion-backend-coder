// import * as viewModels from '../dao/filesystem/models/ProductModel.js';
import { ProductModel } from '../dao/db/models/ProductModel.js';

// Get all products
const getProducts = async (req, res) => {
  try {
    let { limit } = req.query;
    // Filesystem ACTION
    // const products = await viewModels.getProducts(limit);
    // res.status(200).json(products);

    // Mongoose ACTION
    if (limit === undefined || limit >= '10' || limit === '' || limit === '0') {
      limit = 10;
    }
    const products = await ProductModel.find().select('-__v').limit(limit);
    res.status(200).json(products);
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
    // const product = await viewModels.getSingleProduct(pid);
    // product.msg === 'The product not exists'
    //   ? res.status(404).json(product)
    //   : res.status(200).json(product);

    // Mongoose ACTION
    const product = await ProductModel.findById(pid).select('-__v');
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 'error', payload: `${err}` });
  }
};

// Web sockets route
const realTimeProducts = async (req, res) => {
  try {
    const opt = {
      title: 'Real Time Products',
    };
    res.render('realTimeProducts', opt);
  } catch (err) {
    console.log(err);
  }
};

export { getProducts, getSingleProduct, realTimeProducts };
