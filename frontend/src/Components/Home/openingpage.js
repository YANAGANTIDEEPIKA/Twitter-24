import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './openingpage.css';
import { Link } from 'react-router-dom';

const OpeningPage = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    var URL = process.env.REACT_APP_API_URL;
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://'+URL+':1432/api/randomAcceptedForms');
        const forms = response.data;
        if (forms.length > 0) {
          setImages(forms);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer); // Clear timer on component unmount
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container openingpage-slideshow-container">
    <div className="row openingpage-header align-items-center">
      <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
        <h1 className="twitter-title">
          Twitter<span className="highlight">24</span>
        </h1>
      </div>
      <div className="col-12 col-md-6 d-flex flex-column flex-md-row justify-content-center justify-content-md-end openingpage-auth-buttons">
        <Link to="/UserSignUp" className="openingpage-auth-button btn btn-primary me-md-2 mb-2 mb-md-0">Signup</Link>
        <Link to="/UserSignin" className="openingpage-auth-button btn btn-secondary">SignIn</Link>
      </div>
    </div>
    <div className="openingpage-slideshow">
      <button onClick={prevSlide} className="openingpage-nav-button openingpage-left-button">&#10094;</button>
      <div className="openingpage-slides">
        {images.map((image, index) => (
          <img
            key={index}
            src={`http://${URL}:1432/uploads/${image.image}`}
            alt={image.name}
            className={`openingpage-slide-image ${index === currentIndex ? 'openingpage-active' : ''}`}
            style={{ display: index === currentIndex ? 'block' : 'none' }}
          />
        ))}
      </div>
      <button onClick={nextSlide} className="openingpage-nav-button openingpage-right-button">&#10095;</button>
    </div>
    <div className="openingpage-navigation-circles">
      {images.map((_, index) => (
        <div
          key={index}
          className={`openingpage-circle ${index === currentIndex ? 'openingpage-active' : ''}`}
          onClick={() => setCurrentIndex(index)}
        ></div>
      ))}
    </div>
  </div>
);
};
export default OpeningPage;
