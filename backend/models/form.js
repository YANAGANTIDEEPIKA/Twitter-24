
import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   image: { type: String, required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'],default: 'pending' },
//  sellerEmail: { type: String, required: true }
name: { type: String, required: true },
image: { type: String, required: true },
description: { type: String, required: true },
category: { type: String, required: true },
price: { type: Number, required: true },
place: { type: String, required: true },
rating: { type: Number, required: true },
status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
sellerEmail: { type: String, required: true },
number: { type: String }, // Assuming the number field is a string
telegramLink: { type: String }, // Adding Telegram URL
youtubeLink: { type: String },  // Adding YouTube URL
instagramLink: { type: String }, // Adding Instagram URL
linkedinLink: { type: String }, // Adding LinkedIn URL
websiteLink: { type: String },  // Adding Website URL
locationLink: { type: String }, // Adding Location URL
facebookLink: { type: String }  // Adding Facebook URL
});

const Form = mongoose.model('Form', formSchema);

export default Form;


