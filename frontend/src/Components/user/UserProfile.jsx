import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/user/UserProfile.css'; 

import { useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';

const UserProfile = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const token = Cookies.get('JWT'); // Get the JWT from cookies

   useEffect(() => {
       const fetchUser = async () => {
         try {
            const res = await axios.get(`https://bitgrievancemanagementbackendservice.onrender.com/api/users/${id}`, {
               headers: {
                  Authorization: `Bearer ${token}` // Include token in the header
               }
            });
            setUser(res.data);
         } catch (err) {
            console.error(err);
            setError('Error fetching user data');
         } finally {
            setLoading(false);
         }
      };

      if (id) {
         fetchUser();
      }
   }, [id, token]); // Include token in dependency array
    
    useEffect(() => {
        console.log(user)
    },[user])

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className="modalOverlay">
         <div className="modalContent">
            <h1>Your Profile</h1>
            <div className="profileContainer">
               <div className='studentDetailContent'>
                  {user.role === 'student' && (
                     <div className="userStudent">
                        <p className='userProfileCaption'>Name:</p> 
                        <p className="userProfileAnswer">{ user.name}</p>

                        <p className='userProfileCaption'>Email:</p>
                        <p className="userProfileAnswer">{user.email}</p>

                        <p className='userProfileCaption'>Roll No:</p> 
                        <p className="userProfileAnswer">{ user.rollno}</p>

                        <p className='userProfileCaption'>Room No:</p> 
                        <p className="userProfileAnswer">{user.room}</p>
                        
                        <p className='userProfileCaption'>Hostel:</p> <p className="userProfileAnswer">{user.hostel}</p>
                        <p className='userProfileCaption'>Caretaker:</p>
                        <p className="userProfileAnswer">{user.caretakerName}</p>
                     </div>
                  )}
                  {user.role === 'caretaker' && (
                     <div className="userAdmin">
                        <p className='userProfileCaption'>Name:</p> 
                        <p className="userProfileAnswer">{ user.name}</p>
                        <p className='userProfileCaption'>Hostel:</p> <p className="userProfileAnswer">{user.hostel}</p>
                        <p className='userProfileCaption'>Email:</p>
                        <p className="userProfileAnswer">{user.email}</p>
                     </div>
                    
                  )}
                  {user.role === 'admin' && (
                     <div className="userAdmin">
                        <p className='userProfileCaption'>Name:</p> 
                        <p className="userProfileAnswer">{ user.name}</p>
                        <p className='userProfileCaption'>Email:</p>
                        <p className="userProfileAnswer">{user.email}</p>
                     </div>
                    
                  )}
               </div>
               <div className='userIcon'>
                  <img src={user.image || 0} className="userImage"/>
                  <p><strong>{user.role[0].toUpperCase()+user.role.slice(1)}</strong></p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;