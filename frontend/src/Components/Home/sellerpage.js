

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sellerpage.css';

const Seller = () => {
  var URL = process.env.REACT_APP_API_URL;
  const [sellerName, setSellerName] = useState('');
  const [showProfileName, setShowProfileName] = useState(false);
  const [images, setImages] = useState([]);
  const [editImage, setEditImage] = useState(null);
  const [editedDetails, setEditedDetails] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    place: '',
    rating: ''
  });
  const navigate = useNavigate();
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const fetchSellerName = async () => {
      const email = localStorage.getItem('sellerEmail');
      if (!email) {
        navigate('/sellersignin');
        return;
      }

      try {
        const response = await axios.get(`http://${URL}:1432/sellersignin/${email}`);
        if (response.status === 200) {
          setSellerName(response.data.name);
        }
      } catch (error) {
        console.error('Error fetching seller name:', error);
      }
    };

    const fetchImages = async () => {
      const email = localStorage.getItem('sellerEmail');
      if (!email) return;

      try {
        const response = await axios.get(`http://${URL}:1432/api/forms?sellerEmail=${email}`);
        if (response.status === 200) {
          setImages(response.data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchSellerName();
    fetchImages();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setShowProfileName(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setShowProfileName(!showProfileName);
  };

  const handleAddPostClick = () => {
    navigate('/postimg');
  };

  const handleDelete = async (imageId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://${URL}:1432/api/forms/${imageId}`);
      if (response.status === 200) {
        console.log('Image deleted successfully:', response.data);
        setImages(images.filter(image => image._id !== imageId));
      } else {
        console.error('Failed to delete image:', response.data);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleEditClick = (image) => {
    setEditImage(image._id);
    setEditedDetails({
      name: image.name,
      description: image.description,
      category: image.category,
      price: image.price,
      place: image.place,
      rating: image.rating
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://${URL}:1432/api/forms/${editImage}`, editedDetails);
      if (response.status === 200) {
        setImages(images.map(image => (image._id === editImage ? response.data : image)));
        setEditImage(null);
      } else {
        console.error('Failed to edit image:', response.data);
      }
    } catch (error) {
      console.error('Error editing image:', error);
    }
  };

  return (
   
    <div className="seller-container container-fluid">
    <div className="seller-header row">
      <div className="col-12 col-md-auto mb-2 mb-md-0">
        <button className="seller-header-button">Welcome to seller page</button>
      </div>
      <div className="col-12 col-md-auto mb-2 mb-md-0">
        <button className="seller-header-button" onClick={handleAddPostClick}>Add Your Post</button>
      </div>
      <div className="col-12 col-md-auto">
        <button ref={profileButtonRef} className="seller-header-button profile-button" onClick={handleProfileClick}>Profile</button>
      </div>
    </div>
    <div className="seller-content row">
      <div className="image-grid col-12">
        {images.map(image => (
          <div key={image._id} className="image-item col-6 col-md-4 col-lg-3">
            <img src={`http://${URL}:1432/uploads/${image.image}`} alt={image.name} />
            <div className="image-details">
              {editImage === image._id ? (
                <form onSubmit={handleEditSubmit}>
                  <input type="text" name="name" value={editedDetails.name} onChange={handleEditChange} placeholder="Name" className="form-control" />
                  <textarea name="description" value={editedDetails.description} onChange={handleEditChange} placeholder="Description" className="form-control"></textarea>
                  <input type="text" name="category" value={editedDetails.category} onChange={handleEditChange} placeholder="Category" className="form-control" />
                  <input type="number" name="price" value={editedDetails.price} onChange={handleEditChange} placeholder="Price" className="form-control" />
                  <input type="text" name="place" value={editedDetails.place} onChange={handleEditChange} placeholder="Place" className="form-control" />
                  <input type="number" name="rating" value={editedDetails.rating} onChange={handleEditChange} placeholder="Rating" className="form-control" />
                  <button type="submit" className="btn btn-primary">Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setEditImage(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <p className="description">{image.description}</p>
                  <p className="status">Status: {image.status}</p>
                  <p className="status">Name: {image.name}</p>
                  <p className="status">Price: {image.price}</p>
                  <p className="status">Place: {image.place}</p>
                  <p className="status">Rating: {image.rating}</p>
                  <button className="edit-button btn btn-warning" onClick={() => handleEditClick(image)}>Edit</button>
                  <button className="delete-button btn btn-danger" onClick={() => handleDelete(image._id)}>Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {showProfileName && (
        <div id="profileName" className="seller-profile-name">Seller Name: {sellerName}</div>
      )}
    </div>
  </div>
);
};
export default Seller;