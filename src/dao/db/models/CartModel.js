import mongoose, { Schema, model } from 'mongoose';

const cartSchema = new Schema({
  products: [
    {
      product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ],
});

export const CartModel = model('Cart', cartSchema);
