import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import '../../Css/admin/Home.css';
import { BsCalendar2Check, BsClipboard2DataFill } from 'react-icons/bs';
import { MdOutlinePendingActions } from 'react-icons/md';
import UserWriteForm from '../user/UserWriteForm'
import Cookies from'js-cookie'
import axios from 'axios'
import AdminHome from './AdminHome';
import CaretakerHome from '../careTaker/CaretakerHome';

function Home() {
  const [realResponse, setRealResponse] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get('JWT');
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
        setRealResponse(response.data);
      }

    }
    checkToken()
  },
    [navigate,token]
  )


  if (realResponse === null) {
    return <div>Loading...</div>; 
  }

  return (
    (realResponse.role === 'admin') ?
      (<AdminHome />) :
      (realResponse.role) == 'caretaker' ? (<CaretakerHome />) : (<UserWriteForm />)
   
  );
}

export default Home;