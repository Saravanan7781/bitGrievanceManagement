import React from 'react'
import '../../Css/admin/AdminHome.css'
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { HiDocumentSearch } from "react-icons/hi";
import { MdFeedback } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect }  from'react'
import CaretakerHome from '../careTaker/CaretakerHome';

function AdminHome() {
  const navigate = useNavigate();
  const [dashboardView, setDashboardView] = useState(false);

  useEffect(() => {
    console.log("dashboardView : "+ dashboardView)
  
  }, [dashboardView])
  

  return (
      (!dashboardView ? 
      <div className="Adminhome">
        <div className="PageOuter">
         {/* <h1>Admin Home</h1> */}
         <div className="Outerbox">
            <div className="ViewReport" onClick={() => {
              setDashboardView(true);
              // navigate('/inbox');
              console.log('redirect to createUser')
            }}>
              <HiDocumentSearch className="icon3" />
              VIEW REPORTS</div>
            <div className="ViewAdmin" onClick={() => { navigate('/addUser'); console.log('redirect to createUser') }}>
              <RiUserSearchFill className="icon2" />
              VIEW USERS
            </div>
            
            <div className="AddAdmin" onClick={() => { navigate('/CreateUser'); console.log('redirect to createUser') }}><RiUserAddFill className="icon1" />
              Add USER</div>
         <div className="ViewFb"> <MdFeedback className="icon4"/>VIEW FEEDBACK</div>
       </div>
        </div>
      </div >
      : <CaretakerHome />
     
    )
    );
  }


export default AdminHome;