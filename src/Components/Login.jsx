import React, { useState } from 'react'
import '../Css/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";


function Login() {
    const [hovered, setHovered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [lockAnimationOn, setLockAnimationOn] = useState(false);

    const mouseEnter = () => {
        return setHovered(true); 
    }

    const mouseLeave = () => {
        return setHovered(false);
    }


    const handleInputChange = (e) => {
        
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     console.log(username);
        //     const response = await axios.post('http://localhost:8090/api/auth/login', {
        //         username,
        //         password
        //     });
        //     console.log(response.data);
        // } 
         try {
            console.log('username' + username);
            const response = await axios.post('http://localhost:8090/api/auth/login', {
                username,
                password
            })
             
             if (response.data.code===1) {
                 console.log("response data's code : " + response.data.code)
                navigate('home')
             }
        } 
        
        catch (error) {
            console.error('Error:', error); 
        }
    };



  return (
        <div className='loginPage'>
            
            <div className='loginContainer'>
                <h1 className='loginCaption'>Login</h1>
                <div className="loginContent">
                <div className="smallContainers"> <FaRegUser/>
                  <input type='text' name='username' id='username' placeholder='Username' autoComplete='off'
                     onChange={handleInputChange}  required /></div>
                  <div className="smallContainers">
                      { lockAnimationOn?
                      <IoLockOpenOutline size={23}/>
                      :<IoLockClosedOutline size={23} />
                      }
                      <input type='password' name='password' id='password' placeholder='Password'
                          autoComplete='off'
                         
                          onChange={(e) => {
                              handleInputChange(e)
                              setLockAnimationOn(true)
                          }}
                          onMouseLeave={ ()=>setLockAnimationOn(false)}
                          required /></div>
               
                    
                  
                    
                  <div className='submitButtonMain'>
                      <button type='submit'
                          onClick={handleSubmit}
                          onMouseEnter={mouseEnter}
                          onMouseLeave={mouseLeave} className='submitButton'><span className='spanSubmit'>Submit</span>
                          <div className={`submitButtonAnimationBefore ${hovered ? `submitButtonAnimationAfter` : ``}`}></div></button>
                  </div>   
                
                </div>
                <div className="loginContainerDummy">

                </div>
            </div>
        </div>
  )
}

export default Login;