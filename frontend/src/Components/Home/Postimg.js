import React, { useState } from 'react';
import axios from 'axios';
import './postimg.css';

const Postimg = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState(null);
  const [number, setNumber] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const email = localStorage.getItem('sellerEmail'); // Retrieve email from local storage

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('place', place);
    formData.append('rating', rating);
    formData.append('image', image);
    formData.append('email', email); // Add email to form data
    formData.append('number', number);

    if (telegramLink) formData.append('telegramLink', telegramLink);
    if (youtubeLink) formData.append('youtubeLink', youtubeLink);
    if (instagramLink) formData.append('instagramLink', instagramLink);
    if (linkedinLink) formData.append('linkedinLink', linkedinLink);
    if (websiteLink) formData.append('websiteLink', websiteLink);
    if (locationLink) formData.append('locationLink', locationLink);
    if (facebookLink) formData.append('facebookLink', facebookLink);

    try {
        const response = await axios.post('http://localhost:1432/api/forms', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response.data);

        // Clear the input fields
        setName('');
        setDescription('');
        setCategory('');
        setPrice('');
        setPlace('');
        setRating('');
        setImage(null);
        setNumber('');
        setTelegramLink('');
        setYoutubeLink('');
        setInstagramLink('');
        setLinkedinLink('');
        setWebsiteLink('');
        setLocationLink('');
        setFacebookLink('');
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};


  return (
    <div className='ramya4'>
      <div className='lavanya4'>
        <h2>Upload Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={handleInputChange(setName)} />
          </div>
          <div>
            <label>Description:</label>
            <textarea value={description} onChange={handleInputChange(setDescription)} />
          </div>
          <div>
            <label>Category:</label>
            <input type="text" value={category} onChange={handleInputChange(setCategory)} />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" value={price} onChange={handleInputChange(setPrice)} />
          </div>
          <div>
            <label>Place:</label>
            <input type="text" value={place} onChange={handleInputChange(setPlace)} />
          </div>
          <div>
            <label>Rating:</label>
            <input type="number" value={rating} onChange={handleInputChange(setRating)} />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
          </div>
          <div>
            <label>Number:</label>
            <input type="text" value={number} onChange={handleInputChange(setNumber)} />
          </div>
          <div>
            <label>Telegram URL:</label>
            <input type="url" value={telegramLink} onChange={handleInputChange(setTelegramLink)} placeholder="https://t.me/yourusername" />
          </div>
          <div>
            <label>YouTube URL:</label>
            <input type="url" value={youtubeLink} onChange={handleInputChange(setYoutubeLink)} placeholder="https://youtube.com/yourchannel" />
          </div>
          <div>
            <label>Instagram URL:</label>
            <input type="url" value={instagramLink} onChange={handleInputChange(setInstagramLink)} placeholder="https://instagram.com/yourprofile" />
          </div>
          <div>
            <label>LinkedIn URL:</label>
            <input type="url" value={linkedinLink} onChange={handleInputChange(setLinkedinLink)} placeholder="https://linkedin.com/in/yourprofile" />
          </div>
          <div>
            <label>Website URL:</label>
            <input type="url" value={websiteLink} onChange={handleInputChange(setWebsiteLink)} placeholder="https://yourwebsite.com" />
          </div>
          <div>
            <label>Location URL:</label>
            <input type="url" value={locationLink} onChange={handleInputChange(setLocationLink)} placeholder="https://maps.google.com/yourlocation" />
          </div>
          <div>
            <label>Facebook URL:</label>
            <input type="url" value={facebookLink} onChange={handleInputChange(setFacebookLink)} placeholder="https://facebook.com/yourprofile" />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Postimg;
