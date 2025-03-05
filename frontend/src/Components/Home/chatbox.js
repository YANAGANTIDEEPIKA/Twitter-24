// import React from 'react';

// const Chatbox = () => {
//   return (
//     <div>
//       <h1>chatboxPage</h1>
//       <p>Welcome to your chatbox!</p>
//     </div>
//   );
// };

// export default Chatbox;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './chatbox.css';
const Chatbox = () => {
  var URL = process.env.REACT_APP_API_URL;
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [relatedImages, setRelatedImages] = useState([]);
  const navigate = useNavigate();

  const handleQuestionSubmit = () => {
    if (!question.trim()) return;

    axios.post(`http://${URL}:1432/ask`, {
      question
    })
      .then((res) => {
        const { answer, relatedImages } = res.data;
        setChatHistory([{ question, answer }]);
        setRelatedImages(relatedImages || []);
        setQuestion("");
      })
      .catch((err) => {
        console.error("Error asking question:", err);
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container chatbox-page">
      <center><h1 className="text-center mb-4">chinnu</h1></center>
      <div className="chat-history bg-white p-3 rounded shadow-sm mb-4">
        {chatHistory.map((message, index) => (
          <div key={index}>
            <p><strong>Q:</strong> {message.question}</p>
            <p><strong>A:</strong> {message.answer}</p>
          </div>
        ))}
      </div>
      <div className="row image-container mb-4">
        {relatedImages && relatedImages.length > 0 ? (
          relatedImages.map((item, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <div className="image-card">
                <img
                  src={`http://${URL}:1432/uploads/${item.image}`}
                  alt={item.name}
                  className="image img-fluid"
                />
                <div className="image-details p-2">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Price:</strong> {item.price}</p>
                  <p><strong>Place:</strong> {item.place}</p>
                  <p><strong>Rating:</strong> {item.rating}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="chat-input d-flex mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="form-control me-2"
        />
        <button onClick={handleQuestionSubmit} className="btn btn-primary">Ask</button>
      </div>
      <button onClick={handleBack} className="btn btn-secondary">Back</button>
    </div>
  );
};
   
export default Chatbox;
