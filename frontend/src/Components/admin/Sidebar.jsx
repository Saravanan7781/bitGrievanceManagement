import React from 'react';
import '../../Css/admin/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { GoInbox } from "react-icons/go";
import { AiOutlineMessage  } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useEffect, useState } from 'react';



function Sidebar() {
  const [showSidebar, setshowSidebar] = useState(false);
  const navigate = useNavigate();
  const onMouseOver = () => {
    console.log("1");
    setshowSidebar(true)
  }

  const onMouseOut = () => {
    console.log("0");
    setshowSidebar(false)
  }

  return (
    <div className={`sidebarContainer ${showSidebar ? 'show' : ''}`}onMouseOver={onMouseOver} onMouseOut={ onMouseOut}>
      <div className={`sidebarContent ${showSidebar ? 'show' : ''}`}>
      <ul className="sidebarElements"  >
          <li>
            <div className="sidebarInnerEle" onClick={() => { navigate('/home'); console.log('hi') } }>
              <div className="temp">
                <a>
                  <MdOutlineDashboard size={25} />
                </a>
                <div className="words">
                <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Dashboard</p>

                </div>
              </div>
            </div >
          </li>
          <li>
            <div className="sidebarInnerEle"
            onClick={ ()=>navigate('/inbox') }>
               <div className="temp">
                <a>
                  <GoInbox size={25} />
                </a>
                <div className="words">
                <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Inbox</p>

                </div>
              </div>
            </div >
          </li>
          <li>
            <div className="sidebarInnerEle"
            onClick={ ()=>navigate('/CreateUser') }>
               <div className="temp">
                <a>
                  <AiOutlineUserAdd size={25} />
                </a>
               <div className="words">
                <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Add User</p>

                </div>
              </div>
            </div >
          </li>

          {/* <li>
            <div className="sidebarInnerEle">
              <a href="#"><GoInbox size={25} /></a>
            </div >
          </li>
          <li>
            <div  className="sidebarInnerEle">
              <a href="#"><GoInbox size={25} /></a>
            </div >
          </li> */}

        </ul>
        </div> 
    </div>
  );
}

export default Sidebar;