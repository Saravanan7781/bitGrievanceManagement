import React from 'react'
import '../../Css/careTaker/inboxCareTaker.css';
import { FaRegEye } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

function InboxAdmin() {
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);

    const viewBrief = (userId) => {
        navigate(`/viewReport/${userId}`);
    };

    useEffect(() => {

        const fetchSubmissions = async () => {
            let res = await axios.get('http://127.0.0.27:7777/api/user/submissions')
            .then(data => data.data)
            .catch(err => console.log("Error while getting the submissions in axios"));
           setResponse(res);
        }
        fetchSubmissions();
    }, [])
    

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
                
                {
                    response.map((data,index) =>
                        <div className="inboxAdminMain" key={ data._id}>
                     <div className="listOfStudents">
                                <h1>{ index + 1}</h1>
                        </div>
                        <div className="listOfStudents">
                                <h1>{ data.submissions.name} </h1>
                        </div>
                        <div className="listOfStudents">
                                <h1>{ data.submissions.rollno}</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>{ data.domain}</h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>{ data.submissions.hostel} </h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>{ data.submissions.room} </h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>{ data.desc} </h1>
                        </div>
                        <div className="listOfStudents">
                                <h1 className={ data.status==='pending' ? 'pendingStyle' : 'resolvedStyle'}>{ data.status}</h1>
                    </div>
                    <div className="listOfStudents" onClick={()=>viewBrief(data._id)}>
                        <div className="eye" >
                            <FaRegEye />
                        </div>
                    </div>
                </div>
                    
                    )
                }
               
    
                         
            </div>
            
    </div>
  )
}

export default InboxAdmin;