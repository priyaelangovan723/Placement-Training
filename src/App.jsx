import React from "react";
import SigninForm from "./Components/SigninForm";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import SigninAdmin from "./Components/Admin/SigninAdmin";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminRequests from "./Components/Admin/AdminRequests";
import Layout from "./Components/Layout";
import RequestForm from "./Components/RequestForm";

import TrackRequest from "./Components/TrackRequest";

import UserViewRequests from "./Components/UserViewRequests";
import Ongoing from "./Components/Ongoing";
import Aptitude from "./Components/Aptitude";
import Filter from "./Components/Filter";
import AdminViewReq from "./Components/Admin/AdminViewReq";
import AdminOngoing from "./Components/Admin/AdminOngoing";
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
    },
    {
      path : "/admin/signin",
      element : <SigninAdmin/>
    },
    {
      path : "/admin/",
      element : <AdminLayout/>,
      children: [
        {path:"/admin/dashboard",element: <AdminDashboard/>},
        {path:"/admin/view-requests", element: <AdminRequests/>},
        {path:"/admin/view-full-request",element:<AdminViewReq/>},
        {path:"/admin/Ongoing", element : <AdminOngoing/>}
        
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