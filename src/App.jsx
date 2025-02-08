import React from "react";
import SigninForm from "./Components/SigninForm";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";


import Sidebar from "./Components/Sidebar";
import Layout from "./Components/Layout";
import RequestForm from "./Components/RequestForm";
import YourRequests from "./Components/YourRequests";
import TrackRequest from "./Components/TrackRequest";

import UserViewRequests from "./Components/UserViewRequests";
import Ongoing from "./Components/Ongoing";
import Aptitude from "./Components/Aptitude";
import Filter from "./Components/Filter";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <SigninForm/>
    },
    {
      path : "/dashboard",
      element : <Layout/>,
      children: [
        {path:"/dashboard/",element: <Dashboard/>},
        {path:"/dashboard/add-request", element: <RequestForm/>},
        
        {path:"/dashboard/track-request",element: <TrackRequest/>},
        {path:"/dashboard/view-full-req/",element:<UserViewRequests/>},
        {path:"/dashboard/ongoing", element: <Ongoing/>},
        {path:"/dashboard/aptitude", element: <Aptitude/>},
        {path:"/dashboard/filter", element: <Filter/>}
       
      ]
    }
   
    
    
  ])
  return(
    <>
     
  <RouterProvider router = {router}/>
  </>
  )
  
}
export default App