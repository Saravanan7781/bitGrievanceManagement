import React from 'react';
import { CgProfile } from "react-icons/cg";
import '../Css/MainHeader.css';
import Sidebar from './admin/Sidebar';
import { MdOutlineExpandMore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function MainHeader() {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/'); // Log out and navigate to home
  }

  const handleProfileClick = async () => {
    const token = Cookies.get('JWT'); // Get the JWT from cookies
    if (!token) {
      console.error('No token found, please log in.');
      return;
    }

    try {
      // Fetch the current user using the JWT token
      const response = await axios.get('http://127.0.0.1:7777/api/user/current', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userId = response.data._id; // Assuming the user ID is in the response
      navigate(`/user/${userId}`); // Navigate to the user profile page
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <header>
      <div className='mainContainer'>
        <ul className='topRightContent'>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <a onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              <CgProfile size={24} />
            </a>
          </li>
          <li>
            <a href="">
              <MdOutlineExpandMore className="moreButton" size={25} color='white' />
            </a>
          </li>
        </ul>
        <ul className='leftCenterContent'>
          <li><h1><a href=''>BIT</a></h1></li>
          <li><h1>Compliance Management</h1></li>
        </ul>
        <ul className="bottomRightContent" onClick={Logout}>
          <li>Logout</li>
        </ul>
      </div>
      <Sidebar />
    </header>
  );
}

export default MainHeader;
