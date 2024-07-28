import React from 'react'
import { useDispatch } from 'react-redux';
import { appLogout } from '../../store/slices/authSlice';
import "./style.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(appLogout());
  };
  return (
    <div className='navbar-conatiner'>
        <div className='navbar-left-items'>
            <h2>Cloud Home</h2>
        </div>
        <div className='navbar-right-items'>
            <button onClick={handleLogout} style={{backgroundColor: "grey", color: "white", width: "100px", border: "none", padding: "7px", fontSize: "16px"}}>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
