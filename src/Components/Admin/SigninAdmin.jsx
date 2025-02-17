import { GoogleLogin } from "@react-oauth/google"
import React, { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { Link, Navigate, useNavigate } from "react-router-dom"


const SigninAdmin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleSuccess = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    const email = credentialResponseDecoded.email;
    console.log(credentialResponseDecoded)
    const name = credentialResponseDecoded.name;
    setUserData({ email, name });
  };
  const admin1 = [
    {email: "dharanipriya647@gmail.com", name: "priya"},
    {email: "priyaelango285@gmail.com",name: "priya1"}
  ]
    
  if (userData) {
    const result = admin1.find(({email})=> email === userData.email)
    console.log(result)

    if(result != null){
    navigate('/admin/dashboard', {state: userData})
    }
    else{
      console.log("Invalid entry")
    }
  }

  

  return (
    <>
    <div className="container">
      <div className="signin-container">
        <h2>Placement Training Management</h2>
        <GoogleLogin 
          onSuccess={handleSuccess}
          onError={() => { console.error("Failed to login") }}
          // render={({ onClick }) => (
          //   <button onClick={onClick} className="signin-button">
          //     Sign in with Google
          //   </button>
          // )}
        />
       <p>Sign in with your BIT account</p>
       
      </div>
      </div>
    </>
  );
}

export default SigninAdmin;
