import React from 'react';
import '../Css/Sidebar.css';
import { GoInbox } from "react-icons/go";
import { AiOutlineMessage  } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { useEffect,useState } from 'react';

function Sidebar() {
  const [showSidebar, setshowSidebar] = useState(false);

  const onMouseOver = () => {

    console.log("1");
    setshowSidebar(true)
  }

  const onMouseOut = () => {
    console.log("0");
    setshowSidebar(false)
  }

  return (
    <div className="sidebarContainer" onMouseOver={onMouseOver} onMouseOut={ onMouseOut}>
      <div className={`sidebarContent ${showSidebar ? 'show' : ''}`}>
      <ul className="sidebarElements"  >
          <li>
            <div  className="sidebarInnerEle">
              <a href="#"><GoInbox size={25} /></a>
            </div >
          </li>
          <li>
            <div className="sidebarInnerEle">
              <a href="#"><AiOutlineMessage size={25} /></a>
            </div >
          </li>
          <li>
            <div className="sidebarInnerEle">
              <a href="#"><BsGlobe2 size={22} /></a>
            </div >
          </li>
          <li>
            <div className="sidebarInnerEle">
              <a href="#"><GoInbox size={25} /></a>
            </div >
          </li>
          <li>
            <div  className="sidebarInnerEle">
              <a href="#"><GoInbox size={25} /></a>
            </div >
          </li>
        </ul>
        </div> 
    </div>
  );
}

export default Sidebar;
