import React, { useState } from 'react';
import axios from 'axios';
import '../../Css/admin/CreateUser.css';
import MainHeader from '../MainHeader';

const CreateUser = () => {
  const [userData, setUserData] = useState({
    name: '',
    password: '',
    email: '',
    role: 'student',
    caretakerName: '',
    hostel: '',
    roomNo: '',
    wardenName: '',
    rollno: ''
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.27:7777/api/users', userData);
      alert('User created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
       <MainHeader />
    <div className="CreateUserPage">
        <form className="Createuserform" onSubmit={handleSubmit}>
          <div className="createuser1">
      <select name="role" value={userData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="caretaker">Caretaker</option>
          <option value="admin">Admin</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
          required
          />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
          required
          />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          required
          />
    </div>

        {userData.role === 'student' && (
          <div className='Createuser2'>
            <input
              type="text"
              name="rollno"
              placeholder="Roll No"
              value={userData.rollno}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="roomNo"
              placeholder="Room No"
              value={userData.roomNo}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="caretakerName"
              placeholder="Caretaker Name"
              value={userData.caretakerName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="wardenName"
              placeholder="Warden Name"
              value={userData.wardenName}
              onChange={handleChange}
            />
          </div>
        )}
        {(userData.role === 'student' || userData.role === 'caretaker') && (
          <>
          <input
          type="text"
          name="hostel"
          placeholder="Hostel"
          value={userData.hostel}
          onChange={handleChange}
          required
        />
          </>)}
        
        <button type="submit">Create User</button>
      </form>
    </div>
    </>
  );
};

export default CreateUser;