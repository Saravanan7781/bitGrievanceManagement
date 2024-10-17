import React from 'react'
import '../../Css/careTaker/inboxCareTaker.css';
import { FaRegEye } from "react-icons/fa";
import {useNavigate,useSearchParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function InboxAdmin() {
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);
    const [userData, setUserData] = useState();
    const [searchParams] = useSearchParams();
    const preferred = searchParams.get('search');
    const viewBrief = (userId) => {
        navigate(`/viewReport/${userId}`);
    };

    useEffect(() => {
        
        const checkToken = async () => {
            let token = Cookies.get('JWT');
            if (!token) {
                navigate('/');
                return;
            }
            else {
                const temp = await axios.get('http://127.0.0.27:7777/api/user/current', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserData(temp.data);
            }
        }

        checkToken();
    }, [])


     useEffect(() => {
         const fetchSubmissions = async () => {
             if (userData) {

                try {
                    let res = await axios.post(`http://127.0.0.27:7777/api/user/submissions?search=${preferred}`, {
                        role: userData.role,
                        hostel: userData.hostel
                    });
                    setResponse(res.data);  // Set the response data here
                } catch (err) {
                    console.log("Error while getting the submissions:", err);
                }
            }
        };

        fetchSubmissions();
    }, [userData]); 
    

    return (
      <div className="inboxForFlex">
      <div className='inboxAdminOuter'>
                <h1>Inbox</h1>
                <div className={(userData && userData.role !=='caretaker')?'inboxAdminCaption':'inboxAdminCaption  withoutHostel'}>
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
                    {
                        userData && userData.role === 'caretaker' ? 
                        "" :
                            (
                              <div className="Captions">
                                 <h1>Hostel</h1>
                            </div>
                        )
                    }
                      
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
                        <div className={(userData.role==='caretaker')?'inboxAdminMain withoutHostelForAdminMain':"inboxAdminMain"} key={ data._id}>
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
                            {
                                (userData && userData.role === 'caretaker') ? "" : (
                                    <div className="listOfStudents">
                            <h1>{ data.submissions.hostel} </h1>
                        </div>
                                )
                            }
                        
                            <div className="listOfStudents" style={{textAlign:"center"}}>
                            <h1>{ data.submissions.room} </h1>
                        </div>
                        <div className="listOfStudents">
                            <h1>{ data.desc} </h1>
                        </div>
                        <div className="listOfStudents">
                                <h1 className={ data.status==='pending' ? 'pendingStyle' : (data.status==='Resolved')?'resolvedStyle':'rejectedStyle'}>{ data.status}</h1>
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