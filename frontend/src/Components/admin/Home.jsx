import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import '../../Css/admin/Home.css';
import { BsCalendar2Check, BsClipboard2DataFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
// import {useEffect} from 'react';
import Cookies from'js-cookie'
import axios from 'axios'

function Home() {
  const navigate = useNavigate();
  const token = Cookies.get('JWT');

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
        console.log(response.data);
      }

    }
    checkToken()
  },
    
    []
  )

  const list = [
    { id: 1, title: 'TOTAL COMPLAINTS', total: 10 },
    { id: 2, title: ' RESOLVED', total: 2 },
    { id: 3, title: ' PENDING', total: 8 }
  ];

  return (
    <div className='homeMain'>
      <div className={`dashboardGrid info1`}>
        {list.map((ele) => (
          <div className='dashboardInfos' key={ele.id}>
            <div className='info'>
              <div className="infoCaption">
                   <h1>{ele.title}</h1>
              </div>
             
              <div className='infoIcons'>
                {ele.id === 1 ? (
                  <BsCalendar2Check />
                ) : ele.id === 2 ? (
                  <BsClipboard2DataFill />
                ) : (
                  <MdOutlinePendingActions />
                )}
              </div>
              <h1>{ele.total}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;