import React, { useState, useEffect } from 'react';
import '../../Css/admin/AddUser.css';
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFilter } from "react-icons/fa";
import MainHeader from '../MainHeader';

function AddUser() {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [hostelFilter, setHostelFilter] = useState('');

  const viewUser = (userId) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let res = await axios.get('https://bitgrievancemanagementbackendservice.onrender.com/api/users')
        .then(data => data.data)
        .catch(err => console.log("Error while getting the users in axios"));
      setResponse(res);
      setFilteredUsers(res); // Initially, show all users
    };
    fetchUsers();
  }, []);

  // Function to handle the filtering logic
  const handleFilter = () => {
    let filtered = response;

    // Filter by role
    if (roleFilter === 'student') {
      filtered = filtered.filter(user => user.role === 'student');
    } else if (roleFilter === 'caretaker') {
      filtered = filtered.filter(user => user.role === 'caretaker');
    } else if (roleFilter === 'hostel' && hostelFilter) {
      filtered = filtered.filter(user => user.hostel === hostelFilter);
    }

    setFilteredUsers(filtered);
  };

  // Handle changes in the filter dropdowns
  const handleRoleChange = (event) => {
    setRoleFilter(event.target.value);
    setHostelFilter(''); // Reset hostel filter when changing role
  };

  const handleHostelChange = (event) => {
    setHostelFilter(event.target.value);
  };

  // Apply filter when role or hostel changes
  useEffect(() => {
    handleFilter();
  }, [roleFilter, hostelFilter]);

  return (<>
    <MainHeader />
    <div className="UserListForFlex">
      <div className='UserListOuter'>
        <div className='headersec'>
        <h1>Users</h1>
        <div className="filterSection">
          <label htmlFor="roleFilter"><FaFilter /></label>
          <select id="roleFilter" value={roleFilter} onChange={handleRoleChange}>
            <option value="">All</option>
            <option value="student">Student</option>
            <option value="caretaker">Caretaker</option>
            <option value="hostel">Hostel</option>
          </select>

          {/* Show hostel options if 'Hostel' is selected */}
          {roleFilter === 'hostel' && (
            <div>
              <label htmlFor="hostelFilter">Select Hostel: </label>
              <select id="hostelFilter" value={hostelFilter} onChange={handleHostelChange}>
                <option value="">All Hostels</option>
                <option value="Hostel A">Hostel A</option>
                <option value="Hostel B">Hostel B</option>
                <option value="Hostel C">Hostel C</option>
                <option value="Hostel D">Hostel D</option>
              </select>
            </div>
          )}
        </div>
        
        </div>
        



        <div className="UserListCaption">
          <div className="UserListCaptions">
            <h1>Id</h1>
          </div>
          <div className="UserListCaptions">
            <h1>Name</h1>
          </div>
          <div className="UserListCaptions">
            <h1>Role</h1>
          </div>
          <div className="UserListCaptions">
            <h1>Roll No</h1>
          </div>
          <div className="UserListCaptions">
            <h1>Hostel</h1>
          </div>
          <div className="UserListCaptions">
            <h1>Room No</h1>
          </div>
        </div>

        {/* Scrollable container */}
        <div className="UserListMainContainer">
          {
            filteredUsers.map((user, index) => (
              <div className="UserListMain" key={user._id}>
                <div className="UserList">
                  <h1>{index + 1}</h1>
                </div>
                <div className="UserList">
                  <h1>{user.name}</h1>
                </div>
                <div className="UserList">
                  <h1>{(user.role.charAt(0).toUpperCase() + user.role.slice(1))}</h1>
                </div>
                <div className="UserList">
                  <h1>{user.role === 'student' ? user.rollno : '-'}</h1>
                </div>
                <div className="UserList">
                  <h1>{user.hostel || '-'}</h1>
                </div>
                <div className="UserList">
                  <h1>{user.room || '-'}</h1>
                </div>
                <div className="UserList" onClick={() => viewUser(user._id)}>
                  <div className="eye">
                    <FaRegEye />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </>
  );
}

export default AddUser;