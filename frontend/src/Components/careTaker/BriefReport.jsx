import React from 'react'
import '../../Css/careTaker/briefReport.css'

function BriefReport() {
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
                <p>Saravanan S</p>
                </div>
                <div className="mail">
                  <div className="mailQ">
                    <p>Mail: </p></div>
                <p>saravanan.cb22@bitsathy.ac.in</p>
                </div>
                  </div>
              <div className="secondRow">
                <div className="rollno">
                  <div className="rollQ">
                    <p>Roll: </p></div>
                <p>7376222cb146</p>
                </div>
                <div className="roomno">
                  <div className="roomQ">
                    <p>Room no:</p></div>
                <p> 368</p>
                </div>
                  </div>
              <div className="thirdRow">
                <div className="hostel">
                  <div className="hostelQ">
                    <p>Hostel: </p></div>
                <p>Emerald</p>
                </div>
                <div className="domain">
                  <div className="domainQ">
                    <p>Domain: </p></div>
                <p>Bathroom</p>
                </div>
                <div className="caption">
                <p><strong>Description</strong> </p>
                </div>
                <div className="description">
Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti repellendus, iure deleniti esse dignissimos exercitationem doloremque unde molestias laudantium eveniet illum reprehenderit explicabo obcaecati iste hic quas quidem nesciunt itaque.
                </div>
                <div className="status">
                  <p>Status:</p>
                  
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