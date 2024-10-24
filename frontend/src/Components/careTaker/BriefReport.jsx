import {React,useEffect,useState} from 'react'
import '../../Css/careTaker/briefReport.css'
import { useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'


function BriefReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, SetUser] = useState();
  const [response, setResponse] = useState();
  const [status, setStatus] = useState(null);
  const [proof, setProof] = useState(null);
  const token = Cookies.get('JWT');
  
  useEffect(() => {
    const fetchDetails = async () => {
      try { 
          const res = await axios.get(`http://127.0.0.27:7777/api/user/viewSubmission/${id}`)
          setResponse(res.data[0]);
          setProof(res.data[0].proof);
      
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchDetails();
  }, [id]);   

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
       
        SetUser(response.data);
      }

    }
    checkToken()
  },
    []
  )

  useEffect(() => {
    if (user !== null) {
      console.log("response received")
      console.log(user);
    }
  },[user])

  const acceptOrReject = async (ans) => {
    const output = await axios.get(`http://127.0.0.27:7777/api/user/submissions/submissionApproval/${id}?status=${ans}`)
    setResponse((prevResponse) => ({...prevResponse,status:ans}))
 }

  if (!response) {
  <h1>Loading</h1>
}

  return (
    (response &&
    <div className="mainBriefReport">
      <div className="subBriefReport">
        <h1>View Report</h1>
        <div className="reportContainer">
          <div className="firstContainer">
            <div className="complaintNo">
              <p><strong>Complaint No:</strong> 234321</p>
            </div>
            <div className="date">
              <p><strong>Date: </strong>12-08-23</p>
            </div>
            </div>
          <div className="mainReportContainer">
            
            <div className="secondContainer">
              <div className="firstRow">
                <div className="name">
                  <div className="nameQ">
                      <p>Name: </p></div>
                    {/* (response.role=== */}
                    <p>{response.submissions.name}</p>
                    {/* ) */}
                </div>
                <div className="mail">
                  <div className="mailQ">
                    <p>Mail: </p></div>
                <p>{response.submissions.email}</p>
                </div>
                  </div>
              <div className="secondRow">
                <div className="rollno">
                  <div className="rollQ">
                    <p>Roll: </p></div>
                <p>{response.submissions.rollno}</p>
                </div>
                <div className="roomno">
                  <div className="roomQ">
                    <p>Room no:</p></div>
                <p> {response.submissions.room}</p>
                </div>
                  </div>
              <div className="thirdRow">
                <div className="hostel">
                  <div className="hostelQ">
                    <p>Hostel: </p></div>
                <p>{response.submissions.hostel}</p>
                </div>
                <div className="domain">
                  <div className="domainQ">
                    <p>Domain: </p></div>
                <p>{response.domain}</p>
                </div>
                <div className="caption">
                <p><strong>Description</strong> </p>
                </div>
                <div className="description">{response.desc}
                </div>
                <div className="status">
                  <p><strong>Status:</strong></p>
                  <div className="responseStatus">
                    {(response.status==='Rectified' && user.role==='student')?
                       (<div className='optionalStatus'>
                        <p className='approveStatus' onClick={()=> acceptOrReject('Resolved')}>Resolve</p>
                        <p className='rejectStatus' onClick={() => acceptOrReject('Flagged')}>Flag</p>
                      </div>)
                        //part to change
                        :( response.status === 'Resolved' )?
                      
                      (
                        <p className='approveStatus'>Resolved</p>
                     
                      ) 
                      : response.status === 'Rejected' ?  
                        (
                        <p className='rejectStatus'>Rejected</p>
                     
                            ) : 
                            response.status === 'Flagged' ?  
                        (
                        <p className='rejectStatus'>Flagged</p>
                              ) :
                              response.status === 'Rejected' ?  
                        (
                        <p className='rejectStatus'>Rectified</p>
                     
                      )
                             :((user.role==='admin' || user.role==='caretaker') && (response.status==='pending' || response.status==='Flagged') )?
                            (<div className='optionalStatus'>
                        <p className='approveStatus' onClick={()=> acceptOrReject('Rectified')}>Rectified</p>
                        <p className='rejectStatus' onClick={() => acceptOrReject('Rejected')}>Reject</p>
                      </div>
                              ) : (
                                <>
                                </>
                            )
                            
                      }
                    </div>
                </div>
              </div>
            </div>
            <div className="thirdContainer">
              <div className="proof">
               

                {(proof) ?
                  <img src={`${proof}`} alt="User proof" className="proofImage"/>
                  : ( 
                    <>
                      <p>Proof</p>
                      <h1>Loading image</h1>
                    </>
                  )
                }
                        </div>
            </div>
        </div>
        </div>
          </div>
    </div>
  )
)
}

export default BriefReport;