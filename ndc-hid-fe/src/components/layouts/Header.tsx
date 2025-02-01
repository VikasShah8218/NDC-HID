import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { logout } from "../../app/slices/authSlice";
import { useDispatch ,useSelector} from "react-redux";
import { postToServer } from '../../globals/requests';
import { useNavigate } from "react-router-dom";
import NDCImage from "../../assets/images/image_01.png"
import Footer from "./footer";
import "./nav.css"
import { Link } from "react-router-dom";

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
    {/* <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar>
        <Avatar
          src={NDCImage}
          alt="Logo"
          sx={{ marginRight: 2, backgroundColor:"white",padding:"5px",alignItems:"center" }}
        />
        {loggedInUser.first_name}

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            NATIONAL DEFENCE COLLEGE
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", fontSize: "0.875rem" }}
          >
            Building Integration System (BIS)
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ textAlign: "center", fontSize: "0.75rem" }}
          >
            Employee Management System
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleLogout}
          sx={{
            fontWeight: "bold",
            backgroundColor: "red",
            "&:hover": { backgroundColor: "darkred" },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar> */}
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
