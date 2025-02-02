import React from "react";
import { Outlet } from "react-router-dom";
import { logout } from "../../app/slices/authSlice";
import { useDispatch ,useSelector} from "react-redux";
import { postToServer } from '../../globals/requests';
import { useNavigate } from "react-router-dom";
import NDCImage from "../../assets/images/image_01.png"
import Footer from "./footer";
import "./nav.css"

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser =  useSelector((state:any) => state.auth.user)
  const handleLogout = async () => {
      await postToServer("/accounts/logout/",{"refresh": localStorage.getItem("auth_token")});
      dispatch(logout())
  }


  return (
    <>
    <nav>
      <div> 
          <img src={NDCImage} alt="" />
          <h2> {loggedInUser.first_name}</h2>
      </div>
      <div className="headli">
        <div className="hed1"> NATIONAL DEFENCE COLLEGE ( Gov. of India )</div>
        <div className="hed2">Building Integration System (BIS)</div>
        <div className="hed3">Employee Management System</div>
      </div>
      <div>
        <button  onClick={handleLogout}> LOGOUT </button>
      </div>
    </nav>

    <div className="navigation-bar">
      <div className="nag-button" onClick={()=>{navigate("/list")}} >Home</div>
      <div className="nag-button" onClick={()=>{navigate("")}} >New Entry</div>
      <div className="nag-button" onClick={()=>{navigate("/report")}} >Reports</div>
      <div className="nag-button" onClick={()=>{navigate("/event")}} >Events</div>
      <div className="nag-button" onClick={()=>{navigate("/controller")}} >Controller Settings</div>
    </div>
    <Outlet />
    <Footer />
    </>
    
  );
};

export default Header;
