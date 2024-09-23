import React from 'react'
import '../../Css/careTaker/inboxCareTaker.css';
import { FaRegEye } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'


function InboxAdmin() {
    const navigate = useNavigate();
    
    const viewBrief = () => {
        navigate('/viewReport');
    };


    return (
      <div className="inboxForFlex">
      <div className='inboxAdminOuter'>
                <h1>Inbox</h1>
                <div className="inboxAdminCaption">
                        <div className="Captions">
                            <h1>Id</h1>
                        </div>
                        <div className="Captions">
                            <h1>Name</h1>
                        </div>
                        <div className="Captions">
                            <h1>Roll No</h1>
                        </div>
                        <div className="Captions">
                            <h1>Domain</h1>
                        </div>
                        <div className="Captions">
                            <h1>Hostel</h1>
                        </div>
                        <div className="Captions">
                            <h1>Room No</h1>
                        </div>
                        <div className="Captions">
                            <h1>Description</h1>
                        </div>
                        <div className="Captions">
                            <h1>Status</h1>
                    </div>
                    </div>
                <div className="inboxAdminMain">
                     <div className="listOfStudents">
                            <h1>1</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Saravanan </h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>7376222cb146</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Electrical</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Emerald</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>E-368</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Light is sparking</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Pending</h1>
                    </div>
                    <div className="listOfStudents" onClick={viewBrief}>
                        <div className="eye" >
                            <FaRegEye />
                        </div>
                    </div>
                </div>
                 <div className="inboxAdminMain">
                     <div className="listOfStudents">
                            <h1>1</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Saravanan </h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>7376222cb146</h1>
                        </div>
                        
                        <div className="listOfStudents">
                            <h1>Electrical</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Emerald</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>E-368</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Light is sparking,broke lorem the charging port in the wallsdsf sfed</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>Pending</h1>
                    </div>
                    <div className="listOfStudents">
                        <div className="eye">

                            <FaRegEye />
                        </div>
                    </div>
                        
                         
    </div>
                         
            </div>
            
    </div>
  )
}

export default InboxAdmin;