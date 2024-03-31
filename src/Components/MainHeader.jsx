import React from 'react';
import { CgProfile } from "react-icons/cg";
import '../Css/MainHeader.css';
import Sidebar from './Sidebar';
import { MdOutlineExpandMore } from "react-icons/md";

function MainHeader() {
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
          {/* <li><img src="./Logos/bitLogo.ico" /></li> */}
          <li><h1><a href=''>BIT</a></h1></li>
          <li><h1>Compliance Management</h1></li>
        </ul>
        <ul className="bottomRightContent">
          <li><a href=''>Settings</a></li>
          <li><a href=''>About</a></li>
        </ul>
      </div>
      <Sidebar />
    </header>
  );
}

export default MainHeader;
