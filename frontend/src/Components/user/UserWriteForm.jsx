import React, { useState, useEffect } from 'react';
import '../../Css/user/UserWriteForm.css';
import axios from 'axios';
import Cookies from 'js-cookie';

function UserWriteForm() {
  const [textValue, setTextValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('Electrical');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [userId, setUserId] = useState();
  const [notification, setNotification] = useState(''); // State for notification message

  useEffect(() => {
    const getUserId = async () => {
      let token = Cookies.get('JWT');
      try {
        const answer = await axios.get('http://127.0.0.27:7777/api/user/current', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserId(answer.data);
      } catch (error) {
        console.log('Error fetching user ID:', error);
      }
    };
    getUserId();
  }, []);

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7777/api/user/submitUserWriteForm', {
        user_id: userId._id,
        domain: selectedOption,
        desc: textValue,
        proof: image
      });
      console.log(response);

      // Show success notification
      setNotification('Submitted successfully');
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    } catch (err) {
      console.log(err);
      setNotification('Submission failed');
      setTimeout(() => setNotification(''), 3000); // Clear notification after 3 seconds
    }

    // Reset form fields
    setTextValue('');
    setSelectedOption('Electrical'); // Default back to "Electrical"
    setImage(null);
    setPreview(null);
  };

  return (
    <div className='GrievancePage'>
      <div className="formOuter">
        {notification && <div className="customAlert">{notification}</div>} 
        
        <form className='formInner' onSubmit={handleSubmit}>
          <label>
            <p>SELECT DOMAIN</p>
            <div className="dropdown">
              <select className='domainSelect' value={selectedOption} onChange={handleSelectChange}>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Wifi and Internet">Wifi and Internet</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </label>
          <br />
          <label>
            <p>PROBLEM DESCRIPTION</p>
            <textarea
              className='DescriptionInput'
              value={textValue}
              onChange={handleTextChange}
            ></textarea>
          </label>
          <br />
          <div className="submitArea">
            <div className="imageArea">
              <label>
                <p>Upload an image:</p>
                <input
                  className='inputImage'
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <br />
              {preview && <img src={preview} alt="Uploaded" className="previewImage" />}
            </div>
            <div className="btnArea">
              <button className='submitBtn' type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserWriteForm;
