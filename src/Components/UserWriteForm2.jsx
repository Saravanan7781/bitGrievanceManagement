import React from 'react'
import '../Css/UserWriteForm.css'
import { useState } from 'react'

function UserWriteForm2() {
    const [textValue, setTextValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [image, setImage] = useState(null);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Text:', textValue);
    console.log('Selected Option:', selectedOption);
    console.log('Image:', image);
    // Add your form submission logic here
    // For example, send the form data to a server
    // Reset the form fields after submission
    setTextValue('');
    setSelectedOption('');
    setImage(null);
  };

  return (
    <div className='GrievancePage'>
        <div className="formOuter">
            <h2>GRIEVANCE FORM</h2>
            <form onSubmit={handleSubmit}>
      <label>
        Select an option:
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </label>
      <br />
      <label>
        Enter some text:
        <input
          type="text"
          value={textValue}
          onChange={handleTextChange}
        />
      </label>
      <br />
      <label>
        Upload an image:
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      <br />
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
      <br />
      <button type="submit">Submit</button>
    </form>
        </div>
      
    </div>
  )
}

export default UserWriteForm2
