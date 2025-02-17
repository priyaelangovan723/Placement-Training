import { Outlet } from "react-router-dom"

import '../../Styles/Dashboard.css'
import AdminNavbar from "./AdminNavbar"

const AdminLayout = () => {
    return(
        <>
        <div className="main-container">
            <AdminNavbar/>
            <Outlet/>
        </div>
        
        
        </>
    )
}

export default AdminLayout