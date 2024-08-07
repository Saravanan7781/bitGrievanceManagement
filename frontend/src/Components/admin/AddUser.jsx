import react from 'react';
import '../../Css/admin/AddUser.css';
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';

const AddUser = () => {
    const [click, setClick] = useState(0);

        return(
            <>
                <div className='mainAddUser'>
                    <div className="AddUserOuter">
                        <div className="topOfAddUser">
                        <h1>Users</h1>

                        <button type="button" className="addUserbtn">Add User</button>

                        </div>
                        <div className="secondTop">
                            <div className="searchBar">
                                <input type="text" name="" id="" />
                                <BsSearch />
                        </div>
                            <div className="options">
                                <div className="option1 " onClick={() => {
                                    setClick(1);
                                    console.log(click);
                                }}>
                                    <p>Caretakers</p>
                         </div>
                                <div className="option2 " onClick={() => {
                                    setClick(2);
                                     console.log(click);
                                }}>
                                    
                                    <p>Wardens</p>
                        </div>
                            
                        </div>        

                        </div>
                        
                        

                    </div>
                </div>
            </>
        )
}

export default AddUser;