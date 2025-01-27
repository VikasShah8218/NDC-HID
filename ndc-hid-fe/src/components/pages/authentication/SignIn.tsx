import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../../../app/slices/authSlice";
import { BASE_URL } from "../../../globals/requests";
import axios from 'axios';

import './login.css';

const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refs = {
    username: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };
  const postToServer = async (url:string, data = {}) => {
    try {
      const res = await axios.post(`${BASE_URL}${url}`, data, {
      });
      return { status: res.status, data: res.data };  
    } catch (error:any) {
      if (error.response) {
        return { 
          status: error.response.status, 
          data: error.response.data 
        };
      } else {
        return { status: false, data: "An error occurred" };
      }
    }
  };

  
  const submitLogin = async (e: any) => {
    e.preventDefault();
    if (!refs.username.current || !refs.password.current) {
      console.error("Username or password input is missing.");
      return;
    }
    const reqData = {
      username: refs.username.current.value,
      password: refs.password.current.value
    }
    if (!reqData) return false;
    console.log(reqData)
    const result = await postToServer("/accounts/login/", reqData);
    if (result.status===200 || result.status===201 ) {
      dispatch(login(result.data));
      navigate('/');
    }
  };


  return (
    <div className="login-container">
      <h2 className="form-header">Login</h2>
      <form onSubmit={submitLogin}>
        <div className="form-input">
          <input type="text" name="username" ref={refs.username} placeholder="Username" required />
        </div>
        <div className="form-input">
          <input type="password" name="password" ref={refs.password}  placeholder="Password" required />
        </div>
        <input type="submit" value="Login" />
      </form>
    {/* {loading && <Loading />} */}

    </div>  
  );
};

export default SignIn;
