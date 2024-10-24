import React, { useState } from 'react'
import bitLoginLogo from '../Logos/bitLogo.ico'
import '../Css/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegUser,FaEye,FaEyeSlash } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoLockOpenOutline,IoLockOpen,IoLockClosedOutline } from "react-icons/io5";
import Cookie from 'js-cookie';


function Login() {
    const [hovered, setHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [lockAnimationOn, setLockAnimationOn] = useState(false);
    const [userAnimationOn, setUserAnimationOn] = useState(false);
    const [eyeAnimationOn, setEyeAnimationOn] = useState(false);
    const [showEye, setShowEye] = useState(0);

    const mouseEnter = () => {
        return setHovered(true); 
    }

    const mouseLeave = () => {
        return setHovered(false);
    }


    const handleInputChange = (e) => {
        
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
            
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
         try {
            console.log('Email: ' + email);
            const response = await axios.post('http://localhost:7777/api/user/login', {
                email,
                password
            })
             
             
             if (response.data) {
                 Cookie.set("JWT", response.data.token, {expires:1})//0.0416667 for one hour
                console.log("cookies set by login.jsx")
                navigate('home')}
             
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
                  <div className="smallContainers">
                      {
                          userAnimationOn?
                              <FaUser />
                              :<FaRegUser />
                      }
                      <input type='text' name='email' id='email' placeholder='Email'
                          autoComplete='off'
                          onBlur={() => { setUserAnimationOn(false) }}
                          onChange={(e) => {
                              setUserAnimationOn(true)
                              handleInputChange(e)
                          }} required />
                          <div className="icon">
                       
                                </div>
                      
                      
                  </div>
                         


                  <div className="smallContainers">
                      { lockAnimationOn?
                      <IoLockOpen size={25}/>
                      :<IoLockClosedOutline size={25} />
                      }
                      <input type={eyeAnimationOn?`text`:`password`}  name='password' id='password' placeholder='Password'
                          autoComplete='off'
                          onBlur={() => { setLockAnimationOn(false);  }}                          
                          onChange={(e) => { handleInputChange(e); setLockAnimationOn(true);setShowEye(1) }}
                      //   onMouseLeave={ ()=>setLockAnimationOn(false)}
                          
                          
                          required></input>
                     
                      <div className="icon">
                          
                          {
                              showEye ? (
                                  
                                  
                                  eyeAnimationOn ?
                                  <FaEye  size={25}
                                            onClick={(e) => { setEyeAnimationOn(!eyeAnimationOn);  }}/> :
                                  <FaEyeSlash size={25}
                                     onClick={(e) => { setEyeAnimationOn(!eyeAnimationOn); }}/>
                                ):null
                                }
                                </div>
                      
                      
                  </div>  
                    
                  <div className='submitButtonMain'>
                      <button type='submit'
                          onClick={handleSubmit}
                          onMouseEnter={mouseEnter}
                          onMouseLeave={mouseLeave} className='submitButton'><span className='spanSubmit'>Submit</span>
                          <div className={`submitButtonAnimationBefore ${hovered ? `submitButtonAnimationAfter` : ``}`}></div></button>
                  </div>   
                
                </div>
                <div className="loginContainerDummy">
                  <div class="image-container">
                      <img src={ bitLoginLogo} height= '200%' alt="" />
                            </div>

                </div>
            </div>
        </div>
  )
}

export default Login;