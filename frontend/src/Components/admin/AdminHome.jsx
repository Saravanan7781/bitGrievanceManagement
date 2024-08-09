import React from 'react'
import '../../Css/admin/AdminHome.css'
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { HiDocumentSearch } from "react-icons/hi";
import { MdFeedback } from "react-icons/md";
function AdminHome() {
    return (
      <div className="Adminhome">
        <div className="PageOuter">
         <h1>Admin Home</h1>
         <div className="Outerbox">
         <div className="AddAdmin"> <RiUserAddFill className="icon1"/>ADD ADMIN</div>
         <div className="ViewAdmin"> <RiUserSearchFill className="icon2"/>VIEW ADMIN</div>
         <div className="ViewReport"> <HiDocumentSearch className="icon3"/>VIEW REPORT</div>
         <div className="ViewFb"> <MdFeedback className="icon4"/>VIEW FEEDBACK</div>
       </div>
        </div>
      </div>
    );
  }


export default AdminHome;
