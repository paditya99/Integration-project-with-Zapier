import React, { useState, useEffect } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import img1 from "../images/img1.jpg";
import { useAuth } from "./AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const decodedUserData = JSON.parse(storedUserData);
      login(decodedUserData);
      setIsUserLoggedIn(true);
    }
  }, [login]);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);
    login(decoded); // Store user data in the context

    // Save user data in localStorage
    localStorage.setItem("userData", JSON.stringify(decoded));

    setIsUserLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    // Remove user data from localStorage on logout
    localStorage.removeItem("userData");
    setIsUserLoggedIn(false);
  };

  return (
    <div className="container">
      <div className="left-column">
        {/* Image related to login */}
        <img
          src={img1} // Replace with the path to your login image
          alt="Login Page"
          className="login-image"
        />
      </div>
      <div className="right-column">
        {isUserLoggedIn ? (
          <button className="google-login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          // Google authentication button
          <GoogleOAuthProvider clientId="615028398601-j7lcre17nqilafjqrhaku7k1qgihvb21.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </div>
  );
};

export default Signin;
