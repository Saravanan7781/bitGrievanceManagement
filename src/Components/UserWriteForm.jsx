import React from 'react'
import '../Css/UserWriteForm.css'
import { useState } from 'react'


function UserWriteForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
    setIsOpen(!isOpen);
    }

    const handleOptionClick = (option) =>{
        setSelectedOption(option);
        setIsOpen(false);
    }
  return (
    <div className='GrievancePage'>
        <div className="formOuter">
            <h2>GRIEVANCE FORM</h2>
            <div className="formInner">
                <p>DOMAIN</p>
                <div className='dropdown'>
                    <button className='dropdownBtn' onClick={toggleDropdown}>{selectedOption ? selectedOption : "Select an Option"}</button>
                    {isOpen &&(
                        <ul>
                            <li onClick= {() => handleOptionClick('Electrical')}>Electrical</li>
                            <li onClick = {() => handleOptionClick('Plumbing')}>Plumbing</li>
                            <li onClick = {() => handleOptionClick('Maintenance')}>Maintenance</li>
                            <li onClick = {() => handleOptionClick('Wifi and Internet')}>Wifi and Internet</li>
                        </ul>
                    )}
                </div>
                <p>PROBLEM DESCRIPTION</p>
                
            </div>
        </div>
      
    </div>
  )
}

export default UserWriteForm
