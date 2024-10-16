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
            const res = await axios.get(`http://127.0.0.1:7777/api/users/${id}`, {
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
                        <strong>Name:</strong> 
                        <p>{ user.name}</p>

                        <strong>Email:</strong>
                        <p>{user.email}</p>

                        <strong>Roll No:</strong> 
                        <p>{ user.rollno}</p>

                        <strong>Room No:</strong> 
                        <p>{user.room}</p>
                        
                        <strong>Hostel:</strong> <p>{user.hostel}</p>
                        <strong>Caretaker:</strong>
                        <p>{user.caretakerName}</p>
                     </div>
                  )}
                  {user.role === 'caretaker' && (
                     <div className="userAdmin">
                        <strong>Name:</strong> 
                        <p>{ user.name}</p>
                        <strong>Hostel:</strong> <p>{user.hostel}</p>
                        <strong>Email:</strong>
                        <p>{user.email}</p>
                     </div>
                    
                  )}
                  {user.role === 'admin' && (
                     <div className="userAdmin">
                        <strong>Name:</strong> 
                        <p>{ user.name}</p>
                        <strong>Email:</strong>
                        <p>{user.email}</p>
                     </div>
                    
                  )}
               </div>
               <div className='userIcon'>
                  <FaUser size={100} />
                  <p><strong>{user.role}</strong></p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;