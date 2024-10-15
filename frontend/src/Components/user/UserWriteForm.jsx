import React from 'react'
import '../../Css/user/UserWriteForm.css'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function UserWriteForm() {
    const [textValue, setTextValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('Electrical');
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getUserId = async (req, res) => {
      let token = Cookies.get('JWT');
      // console.log(token)
      const answer = await axios.get('http://127.0.0.27:7777/api/user/current', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      setUserId(answer.data)
    
    }
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
    setImage(file);
  };


  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('Text:', textValue);
    console.log('Selected Option:', selectedOption);
    console.log('Image:', image);
    try {
      const response = await axios.post('http://localhost:7777/api/user/submitUserWriteForm', {
        user_id:userId._id,
        domain: selectedOption,
        desc: textValue,
        // proof: image
      });

      console.log(response);
    }
    catch (err) {
      console.log(err)
    }


    setTextValue('');
    setSelectedOption('');
    setImage(null);
  };


  return (
    <div className='GrievancePage'>
        <div className="formOuter">
            <h2>GRIEVANCE FORM</h2>
            <form className='formInner' onSubmit={handleSubmit}>
      <label>
        <p>SELECT DOMAIN</p> <br></br>
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
        <p>PROBLEM DESCRIPTION</p> <br></br>
        <textarea className='DescriptionInput'
         
          value={textValue}
          onChange={handleTextChange}
        ></textarea>
      </label>
      <br />
      <div className="submitArea">
        <div className="imageArea">
      <label>
        <p>Upload an image:</p> <br></br>
        <input className='inputImage'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      <br />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
      <br />
      </div>
      <div className="btnArea">
      <button className='submitBtn' type="submit">Submit</button>
      </div>
      </div>
    </form>
        </div>
     
    </div>
  )
}


export default UserWriteForm


