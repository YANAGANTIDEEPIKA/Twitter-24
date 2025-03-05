import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css';

const Admin = () => {
  var URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://'+URL+':1432/api/forms');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  },[]);

  const handleAccept = async (id) => {
    try {
      const response = await axios.patch(`http://${URL}:1432/api/forms/${id}/accept`);
      setFormData(formData.map(form => (form._id === id ? response.data : form)));
      console.log('Accepted form with ID:', id);
    } catch (error) {
      console.error('Error accepting form:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.patch(`http://${URL}:1432/api/forms/${id}/reject`);
      setFormData(formData.map(form => (form._id === id ? response.data : form)));
      console.log('Rejected form with ID:', id);
    } catch (error) {
      console.error('Error rejecting form:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://${URL}:1432/api/forms/${id}`);
      if (response.status === 200) {
        setFormData(formData.filter(form => form._id !== id));
        console.log('Deleted form with ID:', id);
      } else {
        console.error('Failed to delete form:', response.data);
      }
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const filteredFormData = formData.filter(form => 
    form.sellerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-5 admin-container">
      <h2 className="text-center">Admin Page</h2>
      <input 
        type="text" 
        placeholder="Search by seller email..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="form-control mb-4 admin-search"
      />
      <div className="table-responsive">
        <table className="table table-striped table-bordered admin-table">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Place</th>
              <th>Rating</th>
              <th>Seller Email</th>
              <th>Number</th>
              <th>Telegram URL</th>
              <th>YouTube URL</th>
              <th>Instagram URL</th>
              <th>LinkedIn URL</th>
              <th>Website URL</th>
              <th>Location URL</th>
              <th>Facebook URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFormData.map((form) => (
              <tr key={form._id}>
                <td>{form.name}</td>
                <td>
                  <img src={`http://${URL}:1432/uploads/${form.image}`} alt={form.name} className="img-fluid admin-img" />
                </td>
                <td>{form.description}</td>
                <td>{form.category}</td>
                <td>{form.price}</td>
                <td>{form.place}</td>
                <td>{form.rating}</td>
                <td>{form.sellerEmail}</td>
                <td>
                  {form.number} target="_blank" rel="noopener noreferrer"{form.number},
                </td>
                <td>
                  {form.telegramLink} target="_blank" rel="noopener noreferrer"{form.telegramLink},
                </td>
                <td>
                  href={form.youtubeLink} target="_blank" rel="noopener noreferrer"{form.youtubeLink}
                </td>
                <td>
                  {form.instagramLink} target="_blank" rel="noopener noreferrer"{form.instagramLink}
                </td>
                <td>
                  {form.linkedinLink} target="_blank" rel="noopener noreferrer"{form.linkedinLink}
                </td>
                <td>
                  {form.websiteLink} target="_blank" rel="noopener noreferrer"{form.websiteLink}
                </td>
                <td>
                  {form.locationLink} target="_blank" rel="noopener noreferrer"{form.locationLink}
                </td>
                <td>
                 {form.facebookLink} target="_blank" rel="noopener noreferrer"{form.facebookLink}
                </td>
                <td>
                  {form.status === 'pending' && (
                    <div className="d-flex gap-2 admin-buttons">
                      <button className="btn btn-success admin-button" onClick={() => handleAccept(form._id)}>Accept</button>
                      <button className="btn btn-danger admin-button" onClick={() => handleReject(form._id)}>Reject</button>
                    </div>
                  )}
                  {form.status === 'accepted' && <span>Accepted</span>}
                  {form.status === 'rejected' && <span>Rejected</span>}
                  <button className="btn btn-warning admin-button-delete" onClick={() => handleDelete(form._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
