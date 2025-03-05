// models/Seller.js
import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

export default mongoose.model('Seller', SellerSchema);
