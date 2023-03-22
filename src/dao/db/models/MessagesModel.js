import { Schema, model } from 'mongoose';

const messagesSchema = new Schema({
  messages: String,
});

export const MessagesModel = model('Cart', messagesSchema);
