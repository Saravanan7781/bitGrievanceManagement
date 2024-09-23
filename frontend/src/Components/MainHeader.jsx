import React from 'react';
import { CgProfile } from "react-icons/cg";
import '../Css/MainHeader.css';
import Sidebar from './admin/Sidebar';
import { MdOutlineExpandMore } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
function MainHeader() {
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/ ')
  }


  return (
    <header>
      <div className='mainContainer'>
        <ul className='topRightContent'>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <a href="#">
              <CgProfile  size={24}  />
            </a>
          </li>
          <li>
            <a href="">
              <MdOutlineExpandMore className="moreButton" size={ 25} color='white'/>
            </a>
          </li>
        </ul>
        <ul className='leftCenterContent'>
          <li><h1><a href=''>BIT</a></h1></li>
          <li><h1>Compliance Management</h1></li>
        </ul>
        <ul className="bottomRightContent" onClick={ Logout}>
          <li>Logout</li>
        </ul>
      </div>
      <Sidebar />
    </header>
  );
}

export default MainHeader;
