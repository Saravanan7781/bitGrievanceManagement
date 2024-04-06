import React, { useState } from 'react'
import '../Css/Login.css'
import axios from 'axios';

function Login() {
    const [hovered, setHovered] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const mouseEnter = () => {
        return setHovered(true); 
    }

    const mouseLeave = () => {
        return setHovered(false);
    }

    console.log(hovered);

     const handleInputChange = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(username);
            const response = await axios.post('http://localhost:8090/api/auth/login', {
                username,
                password
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error); 
        }
    };



  return (
        <div className='loginPage'>
            
            <div className='loginContainer'>
                <h1 className='loginCaption'>Login</h1>
                <div className="loginContent">
                
                
                  <input type='text' name='username' id='username' placeholder='Username' autoComplete='off'
                     onChange={handleInputChange}  required />
                    
                  <input type='password' name='password' id='password' placeholder='Password'
                      autoComplete='off'
                      onChange={handleInputChange} required />
                    
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