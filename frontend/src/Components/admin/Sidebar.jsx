import React from 'react';
import '../../Css/admin/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { FiFlag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { GoInbox } from "react-icons/go";
import { AiOutlineMessage  } from "react-icons/ai";
import { BsGlobe2 } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import { LiaHistorySolid } from "react-icons/lia";  
import { AiOutlineUserAdd } from "react-icons/ai";


import { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'


function Sidebar() {
  const token = Cookies.get('JWT')
  const navigate = useNavigate();
  const [showSidebar, setshowSidebar] = useState(false);
  const [data, setData] = useState();


  const onMouseOver = () => {
    setshowSidebar(true)
  }

  const onMouseOut = () => {
    setshowSidebar(false)
  }
  const Logout = () => {
    Cookies.remove('JWT');
    navigate('/'); // Log out and navigate to home
  }

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        navigate('/');
        return;
      }
      else {
        const response = await axios.get('http://127.0.0.27:7777/api/user/current', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setData(response.data);
      }
    
    }
    checkToken()
  },
    [navigate]
  )
  

  return (
    <div className={`sidebarContainer ${showSidebar ? 'show' : ''}`}onMouseOver={onMouseOver} onMouseOut={ onMouseOut}>
      <div className={`sidebarContent ${showSidebar ? 'show' : ''}`}>
        <ul className="sidebarElements"  >
          
          {data && (data.role === 'caretaker' || data.role ==='admin') ? (
            <>
          
              <li>
                <div className="sidebarInnerEle" onClick={() => {
                  navigate('/home');
                }}>
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
                  onClick={() => navigate('/inbox')}>
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
                  onClick={() => navigate('/inbox?search=Flagged')}>
                  <div className="temp">
                    <a>
                      <FiFlag size={25} />
                    </a>
                    <div className="words">
                      <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Flag</p>

                    </div>
                  </div>
                </div >
              </li>
              <li>
                <div className="sidebarInnerEle"
                  onClick={() => navigate('/addUser')}>
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
              <li>
                <div className="sidebarInnerEle"
                  onClick={ Logout}>
                  <div className="temp">
                    <a>
                      <SlLogout size={25} />
                    </a>
                    <div className="words">
                      <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Log out</p>

                    </div>
                  </div>
                </div >
              </li>
            </>
          ) :
            (
              <>
                <li>
                <div className="sidebarInnerEle" onClick={() => {
                  navigate('/home');
                }}>
                  <div className="temp">

          
                    <a>
                  <TfiWrite size={25} />
                </a>
                <div className="words">
                  <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Report</p>

                </div>
     
                  </div>
                </div >
              </li>
              <li>
                <div className="sidebarInnerEle"
                  onClick={() => navigate('/inbox')}>
                  <div className="temp">
                    <a>
                      <LiaHistorySolid size={25} />
                    </a>
                    <div className="words">
                      <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>History</p>

                    </div>
                  </div>
                </div >
              </li>
              <li>
                <div className="sidebarInnerEle"
                  onClick={Logout}>
                  <div className="temp">
                    <a>
                      <SlLogout size={25} />
                    </a>
                    <div className="words">
                      <p className={`hideWords ${showSidebar ? `showWords` : ``}`}>Log out</p>

                    </div>
                  </div>
                </div >
                </li>
                
                
              </>
            )

                
          }
          

        </ul>
        </div> 
    </div>
  );
}

export default Sidebar;