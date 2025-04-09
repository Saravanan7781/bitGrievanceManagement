import React, { useState, useEffect } from 'react';
import '../../Css/careTaker/inboxCareTaker.css';
import { FaRegEye } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function InboxAdmin() {
    const navigate = useNavigate();
    const [response, setResponse] = useState([]);
    const [userData, setUserData] = useState();
    const [searchParams] = useSearchParams();
    const preferred = searchParams.get('search');
    const [statusFilter, setStatusFilter] = useState('');  // New state for status filter

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
            try {
                const temp = await axios.get('https://bitgrievancemanagementbackendservice.onrender.com/api/user/current', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUserData(temp.data);
            } catch (err) {
                console.log("Error while checking token:", err);
            }
        };

        checkToken();
    }, []);

    useEffect(() => {
        const fetchSubmissions = async () => {
            if (!userData) return;

            try {
                if (userData.role === 'caretaker' && preferred === 'Flagged') {
                    const result = await axios.post(`https://bitgrievancemanagementbackendservice.onrender.com/api/user/submissions/flaggedComplaints?role=${userData.role}`, {
                        hostel: userData.hostel
                    });
                    setResponse(result.data);
                } else if (userData.role !== 'student') {
                    const res = await axios.post(`https://bitgrievancemanagementbackendservice.onrender.com/api/user/submissions?search=${preferred}`, {
                        role: userData.role,
                        hostel: userData.hostel
                    });
                    setResponse(res.data);
                } else if (userData.role === 'student') {
                    const result = await axios.post(`https://bitgrievancemanagementbackendservice.onrender.com/api/user/submissions?search=${userData._id}`, {
                        role: userData.role
                    });
                    setResponse(result.data);
                }
            } catch (err) {
                console.log("Error while fetching submissions:", err);
            }
        };

        fetchSubmissions();
    }, [userData, preferred]);

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);  
    };

    const filteredResponse = response.filter(data =>
        statusFilter === '' || data.status === statusFilter
    );

    return (
        <div className="inboxForFlex">
            <div className='inboxAdminOuter'>
                <h1>{(userData && userData.role === 'student') ? `History` : `Inbox`}</h1>

                {/* Status Filter Dropdown */}
                {(preferred!=='Flagged') && (<div className="filterContainer">
                    
                    <select id="statusFilter" value={statusFilter} onChange={handleStatusChange}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rectified">Rectified</option>
                        <option value="Flagged">Flagged</option>
                    </select>
                </div>
                )
                }

                <div className={(userData && userData.role !== 'caretaker') ? 'inboxAdminCaption' : 'inboxAdminCaption withoutHostel'}>
                    {/* Column Headers */}
                    <div className="Captions"><h1>Id</h1></div>
                    <div className="Captions"><h1>Name</h1></div>
                    <div className="Captions"><h1>Roll No</h1></div>
                    <div className="Captions"><h1>Domain</h1></div>
                    {userData && userData.role !== 'caretaker' && <div className="Captions"><h1>Hostel</h1></div>}
                    <div className="Captions"><h1>Room No</h1></div>
                    <div className="Captions"><h1>Description</h1></div>
                    <div className="Captions"><h1>Status</h1></div>
                </div>

                {filteredResponse.map((data, index) => (
                    <div className={(userData.role === 'caretaker') ? 'inboxAdminMain withoutHostelForAdminMain' : "inboxAdminMain"} key={data._id}>
                        <div className="listOfStudents"><h1>{index + 1}</h1></div>
                        <div className="listOfStudents"><h1>{data.submissions.name}</h1></div>
                        <div className="listOfStudents"><h1>{data.submissions.rollno}</h1></div>
                        <div className="listOfStudents"><h1>{data.domain}</h1></div>
                        {userData && userData.role !== 'caretaker' && <div className="listOfStudents"><h1>{data.submissions.hostel}</h1></div>}
                        <div className="listOfStudents" style={{ textAlign: "center" }}><h1>{data.submissions.room}</h1></div>
                        <div className="listOfStudents"><h1>{data.desc}</h1></div>
                        <div className="listOfStudents">
                            <h1 className={
                                data.status === 'pending' ? 'pendingStyle' :
                                    data.status === 'Resolved' ? 'resolvedStyle' :
                                    data.status === 'Rectified' ? 'resolvedStyle' :
                                    data.status === 'Flagged' ? 'rejectedStyle' : 'rejectedStyle'
                            }>
                                {data.status}
                            </h1>
                        </div>
                        <div className="listOfStudents" onClick={() => viewBrief(data._id)}>
                            <div className="eye"><FaRegEye /></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InboxAdmin;
