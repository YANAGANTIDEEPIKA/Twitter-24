
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SellerSignin.css';

const SellerSignin = ({ setAuthenticated }) => {
  var URL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://'+URL+':1432/sellersignin', { email, password });
      if (response.status === 200) {
        localStorage.setItem('sellerEmail', email); // Store seller email
        localStorage.setItem('sellerAuthenticated', 'true');
        setAuthenticated(true);
        navigate('/sellersignin/sellerpage');
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <div className='ramya1'>
    <div className='lavanya1'>
      <h2>Seller Signin</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label>Email or Username:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <center><button type="submit" className="btn">Signin</button></center>
      </form>
      <p>Don't have an account? <a href="/SellerSignup">Signup</a></p>
    </div>
  </div>
);
};

export default SellerSignin;
