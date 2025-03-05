// import mongoose from 'mongoose';

// const SignupSchema = new mongoose.Schema({
//   email: { 
//     type: String,
//      required: true 
//     },
//   password: {
//      type: String,
//       required: true 
//     },
    
// });

// const Signup = mongoose.model('Signup', SignupSchema);

// export default Signup;

import mongoose from 'mongoose';

const SignupSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true 
  },
  email: { 
    type: String,
    required: true 
  },
  password: {
    type: String,
    required: true 
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Signup = mongoose.model('Signup', SignupSchema);

export default Signup;
