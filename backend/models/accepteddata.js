import mongoose from 'mongoose';

const acceptedFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  place: { type: String, required: true },
  viewCount: { type: Number, default: 0 },
  repeatedViewCount: { type: Number, default: 0 },
  repeatedViewers: { type: [String], default: [] },
  ratings: [Number], // Array of ratings
  rating: {
    type: Number,
    default: 0,
  },
  originalFormId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Form' },
  acceptedAt: { type: Date, default: Date.now },
  comments: [{ comment: String, postedBy: String, postedAt: { type: Date, default: Date.now } }],
  // ratings: [{ user: String, rating: Number, postedAt: { type: Date, default: Date.now } }] // Track individual ratings
}, { collection: 'acceptedForms' });

const AcceptedForm = mongoose.model('AcceptedForm', acceptedFormSchema);


export default AcceptedForm;