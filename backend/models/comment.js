


import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  acceptedFormId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'AcceptedForm' },
  email: { type: String, required: true },  // Add email field
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
 