


import React, { useEffect, useState } from 'react';
import './mainpage.css';
import profileImage from '../images/profile.jpg';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaEye, FaEyeSlash } from 'react-icons/fa';

const Main = () => {
  const [acceptedForms, setAcceptedForms] = useState([]);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [email, setEmail] = useState('');
  const [searchQueryPlace, setSearchQueryPlace] = useState('');
  const [searchQueryName, setSearchQueryName] = useState('');
  const [selectedForm, setSelectedForm] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null); // Track rating for the specific form
  const [quantity, setQuantity] = useState(1); // Track quantity for the cart
  const [cart, setCart] = useState([]); // New state for cart management
  const [showCart, setShowCart] = useState(false); // State to toggle cart view
  const [showCartForm, setShowCartForm] = useState(false); // Show cart form in the modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedForms = async () => {
      try {
        let url = `http://localhost:1432/api/acceptedForms?place=${searchQueryPlace}&name=${searchQueryName}&category=${selectedCategory}`;
        if (selectedCategory !== 'All') {
          url = `http://localhost:1432/api/acceptedFormsByCategory?category=${selectedCategory}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setAcceptedForms(data);
      } catch (error) {
        console.error('Error fetching accepted forms:', error);
      }
    };

    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchUserEmail(storedEmail);
    }

    fetchAcceptedForms();
  }, [searchQueryPlace, searchQueryName, selectedCategory]);

  const fetchUserEmail = async (email) => {
    try {
      const response = await fetch(`http://localhost:1432/signin/${email}`);
      const data = await response.json();
      setEmail(data.email);
    } catch (error) {
      console.error('Error fetching user email:', error);
    }
  };

  const fetchComments = async (formId) => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms/${formId}/comments`);
      const data = await response.json();
      setComments((prevComments) => ({ ...prevComments, [formId]: data }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleProfileClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSellerLoginClick = () => {
    navigate('/SellerSignin');
  };

  const handleChatboxClick = () => {
    navigate('/mainpage/chatbox');
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  const handleSearchByPlace = async () => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms?place=${searchQueryPlace}&category=${selectedCategory}`);
      const data = await response.json();
      setAcceptedForms(data);
    } catch (error) {
      console.error('Error fetching forms by place:', error);
    }
  };

  const handleSearchByName = async () => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms?name=${searchQueryName}&category=${selectedCategory}`);
      const data = await response.json();
      setAcceptedForms(data);
    } catch (error) {
      console.error('Error fetching forms by name:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageClick = async (form) => {
    setSelectedForm(form);
    setRating(form.rating); // Set the current rating of the form
    setShowCartForm(false); // Hide the cart form initially
  
    try {
      // Send request to increment view count or repeated view count
      const viewCountResponse = await fetch(`http://localhost:1432/api/acceptedForms/${form._id}/incrementViewCount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!viewCountResponse.ok) {
        const errorText = await viewCountResponse.text();
        throw new Error(`Failed to increment view count: ${viewCountResponse.statusText} - ${errorText}`);
      }
  
      // Fetch updated form data
      const formResponse = await fetch(`http://localhost:1432/api/acceptedForms/${form._id}`);
      
      if (!formResponse.ok) {
        const errorText = await formResponse.text();
        throw new Error(`Failed to fetch updated form: ${formResponse.statusText} - ${errorText}`);
      }
  
      const updatedForm = await formResponse.json();
      
      // Update the state to reflect changes immediately
      setAcceptedForms((prevForms) =>
        prevForms.map((f) => (f._id === form._id ? updatedForm : f))
      );
  
      setSelectedForm(updatedForm); // Update selected form if it's the same one
  
    } catch (error) {
      console.error('Error updating view counts or fetching updated form:', error);
    }
  
    try {
      // Fetch comments
      await fetchComments(form._id);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };










  const handleCloseFullImage = () => {
    setSelectedForm(null);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePostComment = async (acceptedFormId) => {
    if (newComment.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms/${acceptedFormId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, comment: newComment }),
      });

      if (response.ok) {
        const updatedComments = await response.json();
        setComments((prevComments) => ({ ...prevComments, [acceptedFormId]: updatedComments }));
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentBoxClick = (e) => {
    e.stopPropagation(); // Prevent the click event from closing the modal
  };

  const handleRatingClick = async (formId, rating) => {
    try {
      const response = await fetch(`http://localhost:1432/api/acceptedForms/${formId}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (response.ok) {
        const updatedForm = await response.json();
        setAcceptedForms((prevForms) =>
          prevForms.map((form) => (form._id === formId ? updatedForm : form))
        );
        if (selectedForm && selectedForm._id === formId) {
          setSelectedForm(updatedForm); // Update selected form if it's the same one
          setRating(updatedForm.rating); // Update the rating
        }
      } else {
        console.error('Failed to update rating');
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleStarHover = (index) => {
    setHover(index);
  };

  const handleStarLeave = () => {
    setHover(null);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      setCart((prevCart) => [
        ...prevCart,
        { ...selectedForm, quantity },
      ]);
      setQuantity(1); // Reset quantity after adding to cart
      setShowCartForm(false); // Hide the cart form after adding
    }
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="mainpage-container">
      <div className="mainpage-header">
        <button className="mainpage-header-btn" onClick={handlePrevious}>Previous</button>
        <input
          type="text"
          value={searchQueryPlace}
          onChange={(e) => setSearchQueryPlace(e.target.value)}
          placeholder="Enter a place"
          className="mainpage-search-input"
        />
        <button className="mainpage-header-btn" onClick={handleSearchByPlace}>Search by Place</button>
        <input
          type="text"
          value={searchQueryName}
          onChange={(e) => setSearchQueryName(e.target.value)}
          placeholder="Enter a name"
          className="mainpage-search-input"
        />
        <button className="mainpage-header-btn" onClick={handleSearchByName}>Search by Name</button>
        <button className="mainpage-header-btn" onClick={handleCartClick}>
          Cart ({cart.length})
        </button>
        <div className="mainpage-profile-container">
          <img
            src={profileImage}
            alt="Profile"
            className="mainpage-profile-picture"
            onClick={handleProfileClick}
          />
          {showProfileOptions && (
            <div className="mainpage-profile-options">
              <p>Email: {email}</p>
              <button onClick={handleSellerLoginClick}>Seller Login</button>
              <p ><a  className='chinnu' href="/Admin">Admin Login</a></p>
            </div>
          )}
        </div>
        <button className="mainpage-header-btn" onClick={handleChatboxClick}>Chinnu</button>
      </div>
      <div className="mainpage-body-container">
        <div className="mainpage-sidebar">
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryClick('All')}>All</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'clothes' ? 'active' : ''}`} onClick={() => handleCategoryClick('clothes')}>Clothes</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'food' ? 'active' : ''}`} onClick={() => handleCategoryClick('food')}>Food</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'footwear' ? 'active' : ''}`} onClick={() => handleCategoryClick('footwear')}>Footwear</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Accessories' ? 'active' : ''}`} onClick={() => handleCategoryClick('Accessories')}>Accessories</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Blankets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Blankets')}>Blankets</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Electronic Gadgets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Electronic Gadgets')}>Electronic Gadgets</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Toys' ? 'active' : ''}`} onClick={() => handleCategoryClick('Toys')}>Toys</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Industrial Products' ? 'active' : ''}`} onClick={() => handleCategoryClick('Industrial Products')}>Industrial Products</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'All' ? 'active' : ''}`} onClick={() => handleCategoryClick('All')}>All</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'clothes' ? 'active' : ''}`} onClick={() => handleCategoryClick('clothes')}>Clothes</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'food' ? 'active' : ''}`} onClick={() => handleCategoryClick('food')}>Food</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'footwear' ? 'active' : ''}`} onClick={() => handleCategoryClick('footwear')}>Footwear</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Accessories' ? 'active' : ''}`} onClick={() => handleCategoryClick('Accessories')}>Accessories</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Blankets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Blankets')}>Blankets</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Electronic Gadgets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Electronic Gadgets')}>Electronic Gadgets</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Toys' ? 'active' : ''}`} onClick={() => handleCategoryClick('Toys')}>Toys</button>
          <button className={`mainpage-sidebar-btn ${selectedCategory === 'Industrial Products' ? 'active' : ''}`} onClick={() => handleCategoryClick('Industrial Products')}>Industrial Products</button>
        </div>
        <div className="mainpage-content">
          {acceptedForms.map(form => (
            <div className="mainpage-card" key={form._id}>
              <img
                src={`http://localhost:1432/uploads/${form.image}`}
                alt={form.name}
                className="mainpage-card-image"
                onClick={() => handleImageClick(form)}
              />
              <div className="mainpage-card-content">
                <h2>{form.name}</h2>
                <div className="mainpage-rating">
                  {Array(5).fill(0).map((_, index) => (
                    <FaStar
                      key={index}
                      className={`star ${index < (form.rating || 0) ? 'filled' : ''}`}
                      onMouseEnter={() => handleStarHover(index + 1)}
                      onMouseLeave={handleStarLeave}
                      onClick={() => handleRatingClick(form._id, index + 1)}
                    />
                  ))}
                  <span>{form.rating || 0} / 5</span>

                </div>
                <p className='view'><FaEye  />{form.viewCount}</p>   
                <p className='rview'><FaEyeSlash   /> {form.repeatedViewCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedForm && (
        <div className="mainpage-full-image-container">
          <img src={`http://localhost:1432/uploads/${selectedForm.image}`} alt="Full View" className="mainpage-full-image" />
          <div className="mainpage-full-image-details">
            <h2>{selectedForm.name}</h2>
            <p><b>Description: </b>{selectedForm.description}</p>
            <p><b>Price:</b> ${selectedForm.price}</p>
            <p><b>Place:</b> {selectedForm.place}</p>
            <p><b>rating: </b>{selectedForm.rating}</p>
            <p><b>View Count:</b> {selectedForm.viewCount}</p>
            <p><b>Repeated View Count:</b> {selectedForm.repeatedViewCount}</p>






              

           <div className="mainpage-rating">
                {Array(5).fill(0).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`star ${index < (rating || 0) ? 'filled' : ''}`}
                    onMouseEnter={() => handleStarHover(index + 1)}
                    onMouseLeave={handleStarLeave}
                    onClick={() => handleRatingClick(selectedForm._id, index + 1)}
                  />
                ))}
                <span>{rating || 0} / 5</span>
              </div>
              
              <button onClick={handleAddToCart}>Add to Cart</button>
            <div className="mainpage-comments">
              {comments[selectedForm._id] && comments[selectedForm._id].map(comment => (
                <div className="mainpage-comment" key={comment._id}>
                  <p>{comment.comment} - <span>{comment.postedBy}</span></p>
                </div>
              ))}
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
                className="mainpage-comment-input"
              />
              <button onClick={() => handlePostComment(selectedForm._id)} className="mainpage-post-comment-btn">Post Comment</button>
            </div>
          </div>
          <button onClick={handleCloseFullImage} className="mainpage-close-full-image">Close</button>
        </div>
      )}
      

{showCart && (
        <div className="mainpage-cart">
          <h2>Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <img src={`http://localhost:1432/uploads/${item.image}`} alt={item.name} className="mainpage-cart-image" />
                  <p>{item.name}</p>
                  
                  <p>{item.price} USD</p>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => setCart([])}>Clear Cart</button>
        </div>
      )}
     <footer className='mainpage-footer'>contact details</footer>
    </div>
  );
};

export default Main;


