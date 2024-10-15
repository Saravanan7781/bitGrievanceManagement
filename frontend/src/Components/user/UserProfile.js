import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Css/user/UserProfile.css'; // Import your CSS file
import { useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';

const UserProfile = () => {
   const { id } = useParams();
   console.log('User ID:', id);
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

   if (loading) return <p>Loading...</p>;
   if (error) return <p>{error}</p>;

   return (
      <div className="modalOverlay">
         <div className="modalContent">
            <h1>User Profile</h1>
            <div className="profileContainer">
               <div className='info'>
                  {user.role === 'student' && (
                     <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Roll No:</strong> {user.rollno}</p>
                        <p><strong>Room No:</strong> {user.room}</p>
                        <p><strong>Hostel:</strong> {user.hostel}</p>
                        <p><strong>Caretaker:</strong> {user.caretakerName}</p>
                     </>
                  )}
                  {user.role === 'caretaker' && (
                     <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Hostel:</strong> {user.hostel}</p>
                     </>
                  )}
                  {user.role === 'admin' && (
                     <>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        
                     </>
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
