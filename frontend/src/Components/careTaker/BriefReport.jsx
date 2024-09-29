import {React,useEffect,useState} from 'react'
import '../../Css/careTaker/briefReport.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function BriefReport() {
  const { id } = useParams();
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.27:7777/api/user/viewSubmission/${id}`)
        setResponse(res.data[0]);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchDetails();
  }, [id]);


if (!response) {
    return <div>Loading...</div>;
  }

  return (
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
                <p>{response.submissions.name}</p>
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
                    {response.status === 'resolved' ? 'resolved' :
                      (<div className='optionalStatus'>
                      <p className='approveStatus'>Approve</p>
                        <p className='rejectStatus'>Reject</p>
                      </div>
                      )
                    }</div>
                </div>
              </div>
            </div>
            <div className="thirdContainer">
              <div className="proof">
                <p>Proof</p>
                        </div>
            </div>
        </div>
        </div>
          </div>
    </div>
  )
}

export default BriefReport;