
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './usersignin.css';

const UserSignin = ({ setAuthenticated }) => {
  var URL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://'+URL+':1432/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 401) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      // Save the email and authenticated status in local storage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('authenticated', 'true');

      setAuthenticated(true);
      navigate('/mainpage');
    } catch (error) {
      setError(error.message);
    }
  };
  const handlefront = () => {
    navigate(+1);
  };
  return (
    <div className='ramya3'>
      <div className='lavanya3'>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
        <p>Don't you have an account? <a href="/usersignup">Signup</a></p>
        <button className="btn btn-secondary mt-3" onClick={handlefront}>Forward</button>
      </div>
    </div>
  );
};

export default UserSignin;
