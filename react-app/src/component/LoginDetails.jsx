import {SyncLoader} from 'react-spinners'
import React, { useEffect, useState, useCallback } from "react";
import './LoginDetails.css'; // Assuming you have a CSS file for styles

const LoginDetails = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    mailid: "",
    timeZone: "",
    createdTime: "",
  });

  useEffect(() => {
    window.catalyst.auth
      .isUserAuthenticated()
      .then((result) => {
         console.log(result.content)
        let userDetails = {
          firstName: result.content.first_name,
          lastName: result.content.last_name,
          mailid: result.content.email_id,
          timeZone: result.content.time_zone,
          createdTime: result.content.created_time,
        };
        setUserDetails(userDetails);
        setIsUserAuthenticated(true);
      })
      .catch((err) => {
        console.error('Error checking authentication:', err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const logout = useCallback(() => {
    const redirectURL = "/__catalyst/auth/login";
    window.catalyst.auth.signOut(redirectURL);
  }, []);

  if (isFetching) {
    return <SyncLoader color="#36d7b7" />;
  }

  if (!isUserAuthenticated) {
    return (
      <div>
        <h1>Login Required</h1>
        <p>You are not logged in. Please log in to continue.</p>
        <a href="/__catalyst/auth/login">Login</a>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 style={{ textAlign: 'center' }}>User Profile Information</h1>
      <img
        alt="usericon"
        id="userimg"
        width="200px"
        height="450px"
        src="https://cdn2.iconfinder.com/data/icons/user-management/512/profile_settings-512.png"
        style={{ width: '80px', height: '80px' }}
      />
      <p className="title">First Name : {userDetails.firstName}</p>
      <p className="title">Last Name: {userDetails.lastName}</p>
      <p className="title">Email Address: {userDetails.mailid}</p>
      <p className="title">Time Zone: {userDetails.timeZone}</p>
      <p className="title">Joined On: {userDetails.createdTime}</p>
      <div id="logoutbtn" style={{ textAlign: "inline-block" }}>
        <button onClick={logout} id="logout" style={{ display: "inline-block" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoginDetails;
