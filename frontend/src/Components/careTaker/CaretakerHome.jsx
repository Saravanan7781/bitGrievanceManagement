import React from 'react'
import Cookies from'js-cookie'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { BsCalendar2Check } from 'react-icons/bs';
import { PiNotepadBold } from "react-icons/pi";
import { MdOutlinePendingActions } from 'react-icons/md';

function CaretakerHome() {
    const navigate = useNavigate();
  const token = Cookies.get('JWT');
  const [realResponse, setRealResponse] = useState(null);
  const [dashboardInfo, setDashboardInfo] = useState(null);
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
        console.log("from caretaker's page");
        // console.log(realResponse) 
      }

    }
    checkToken();
  
  }
    ,[navigate,token]
  );


  useEffect(() => {
    const getDashboardDetails = async (realResponse) => {
      console.log(realResponse.role);
      console.log(realResponse.hostel)
        const dashboardResult = await axios.post('http://127.0.0.27:7777/api/user/adminCount', {
          role: realResponse.role,
          hostel: realResponse.hostel 
        }
        )

      // console.log(dashboardResult)
      setDashboardInfo(dashboardResult.data)
      console.log(dashboardInfo)
    }
    
    if (realResponse) {
      console.log("n")  
      getDashboardDetails(realResponse);
    }
  } ,
    [realResponse]  
)

  const list = dashboardInfo
    ? [
        { id: 1, title: 'RESOLVED', total: dashboardInfo.resolved || 0 }, // Fetch total complaints
        { id: 2, title: 'TOTAL COMPLAINTS', total: dashboardInfo.total || 0 }, // Fetch resolved complaints
        { id: 3, title: 'PENDING', total: dashboardInfo.pending || 0 }, // Fetch pending complaints
      ]
    : [
        { id: 1, title: 'RESOLVED', total: 0 }, // Default when dashboardInfo is not available
        { id: 2, title: 'TOTAL COMPLAINTS', total: 0 },
        { id: 3, title: 'PENDING', total: 0 },
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
                  <BsCalendar2Check style={{color:'green'}} />
                ) : ele.id === 2 ? (
                    <PiNotepadBold style={{color:'black'}} />
                    
                ) : (
                  <MdOutlinePendingActions style={{color:'#ff9933'}}/>
                )}
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