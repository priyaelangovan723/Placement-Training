import { GoogleLogin } from "@react-oauth/google"
import React, { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Link, Navigate, useNavigate } from "react-router-dom"


const SigninForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const email = credentialResponseDecoded.email;
    console.log(credentialResponseDecoded)
    const name = credentialResponseDecoded.name;
    setUserData({ email, name });
  };

  if (userData) {
    // return <Dashboard emailid={userData.email} name={userData.name} />;
    navigate('/dashboard', {state: userData})
    
  }

  const handleadmin = () =>{
    navigate("/admin/signin")
  }

  return (
    <div className="container">
      <div className="signin-container">
        <h2>Placement Training Management</h2>
        <div className="spacer"></div>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={() => console.error("Failed to login")}
        />
        
        <p>Sign in with your BIT account</p>
        <div className="spacer"></div>
        <button onClick={handleadmin} className="admin-button">Admin</button>
      </div>
    </div>
    
  );
}

export default SigninForm;
