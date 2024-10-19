import React from 'react'
import Cookies from'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { BsCalendar2Check } from 'react-icons/bs';
import { PiNotepadBold } from "react-icons/pi";
import { MdOutlinePendingActions } from 'react-icons/md';


//CSS FOR THIS FILE IS IN Home.css


import pending from '../../Logos/pending.png'
import resolved from '../../Logos/resolved.png'
import total from'../../Logos/total.png'
import rejected from'../../Logos/rejected.png'

function CaretakerHome() {
    const navigate = useNavigate();
  const token = Cookies.get('JWT');
  const [realResponse, setRealResponse] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);

  function dashboardClicked(params) {
    (params)?
      navigate(`/inbox?search=${params}`) :
      navigate(`/inbox`)
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
        setRealResponse(response.data);
      }

    }
    checkToken();
  
  }
    ,[navigate,token]
  );


  useEffect(() => {
    const getDashboardDetails = async (realResponse) => {
        const dashboardResult = await axios.post('http://127.0.0.27:7777/api/user/adminCount', {
          role: realResponse.role,
          hostel: realResponse.hostel 
        }
        )

      // 
      setDashboardInfo(dashboardResult.data)
    }
    
    if (realResponse) {
  
      getDashboardDetails(realResponse);
    }
  } ,
    [realResponse]  
  )
  
  useEffect(() => {
  },[dashboardInfo])

  const list = dashboardInfo
    ? [
      {
        id: 1, title: 'RESOLVED', total: dashboardInfo.resolved || 0,
          preferred: "Resolved"
         }, // Fetch total complaints
        { id: 2, title: 'TOTAL COMPLAINTS', total: dashboardInfo.total || 0 }, // Fetch resolved complaints
      { id: 3, title: 'PENDING', total: dashboardInfo.pending || 0 ,
          preferred: "Pending"},
         { id: 4, title: 'REJECTED', total: dashboardInfo.rejected || 0 ,
          preferred: "Rejected"},
         // Fetch pending complaints
      ]
    : [
        { id: 1, title: 'RESOLVED', total: 0 }, // Default when dashboardInfo is not available
        { id: 2, title: 'TOTAL COMPLAINTS', total: 0 },
      { id: 3, title: 'PENDING', total: 0 },
        { id: 4, title: 'REJECTED', total:  0 },
      ];

  return (
    <div className='homeMain'>
      <div className={`dashboardGrid info1`}>
        {list.map((ele) => (
          <div className='dashboardInfos' key={ele.id}>
            <div className='info' onClick={()=>dashboardClicked(ele.preferred)}>
              <div className="infoCaption">
                   <h1>{ele.title}</h1>
              </div>
             
              <div className='infoIcons' >
                {ele.id === 1 ? (
                  <img src={ resolved} alt="resolved" style={{height:"90%"}}/>
                ) : ele.id === 2 ? (
                    <img src={total} alt="total" style={{height:"90%",translate: "10px"}}/>
                    
                ) : ele.id === 3 ?  (
                      <img src={ pending} alt="pending" style={{height:"90%"}}/>
                    ) : (
                        <img src={ rejected} alt="rejected" style={{height:"90%"}}/>
                )
              }
              </div>
              <h1>{ele.total}</h1>
            </div>  
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaretakerHome