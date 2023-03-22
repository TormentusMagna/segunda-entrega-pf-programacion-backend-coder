import * as cartModels from '../dao/filesystem/models/CartModel.js';
import { CartModel } from '../dao/db/models/CartModel.js';
import { ProductModel } from '../dao/db/models/ProductModel.js';

// Add a new cart
const addCart = async (req, res) => {
  try {
    // Filesystem ACTION
    // const newCart = await cartModels.addCart();
    // return res.status(201).json(newCart);

    // Mongoose ACTION
    const newCart = await CartModel.create({ products: [] });
    return res.status(201).json(newCart);
  } catch (err) {
    console.log(err);
  }
};

// Get products from a specific cart
const getCartProducts = async (req, res) => {
  try {
    const { cid } = req.params;
    // Filesystem ACTION
    // const products = await cartModels.getCartProducts(cid);
    // products.msg === 'The cart not exists'
    //   ? res.status(404).json(products)
    //   : res.status(200).json(products);

    // Mongoose ACTION
    const products = await CartModel.findById({ _id: cid });
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
  }
};

// Add products to a specific cart
const addProductsToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    // Filesystem ACTION
    // const addProducts = await cartModels.addProductsToCart(cid, pid);
    // switch (addProducts.msg) {
    //   case 'The cart not exists':
    //     return res.status(404).json(addProducts);
    //   case 'The product not exists':
    //     return res.status(404).json(addProducts);
    //   case 'The product already exists in cart. Product quantity updated successfully':
    //     return res.status(200).json(addProducts);
    //   default:
    //     return res.status(201).json(addProducts);
    // }

    // Mongoose ACTION
    const cartSelected = await CartModel.findById({ _id: cid });

    const newProduct = {
      product: pid,
      quantity: 1,
    };

    cartSelected.products.push(newProduct);

    const productAdded = await CartModel.findByIdAndUpdate(
      { _id: cid },
      { products: cartSelected.products }
    );

    return res.status(200).json(cartSelected);
  } catch (err) {
    console.log(err);
  }
};

export { addCart, getCartProducts, addProductsToCart };
