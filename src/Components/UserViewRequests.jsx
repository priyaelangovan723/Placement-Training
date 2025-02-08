import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../Styles/Dashboard.css';
import './RequestForm.css';
import { Link } from "react-router-dom";
import './UserViewRequests.css';

const UserViewRequests = () => {
    const location = useLocation();
    const { id } = location.state || {}; // Retrieve the ID passed via navigate
    const [requestDetails, setRequestDetails] = useState(null);
    const [trainingStatus, setTrainingStatus] = useState("");

    useEffect(() => {
        if (id) {
            fetchRequestDetails(id);
        }
    }, [id]);

    const fetchRequestDetails = (id) => {
        const requests = [
            {
                "ID": 101,
                "Title": "Advanced Python Training",
                "Resource": "Inside BIT",
                "Start Date": "2024-02-01",
                "End Date": "2024-02-28",
                "Description": "An advanced training program on Python covering advanced topics like data analysis and machine learning.",
                "Trainer ID": "T1001",
                "Duration": "4 weeks",
                "Venue Details": "Zoom link provided to all participants",
                "Submitted On": "1/15/2024, 10:04:02 AM",
                "Request Status": "Approved",
                "Remarks": "Successfully completed, all modules covered",
                "View": "Link to course material"
            }
        ];
        const request = requests.find((req) => req.ID === id);

        if (request) {
            setRequestDetails(request);
        } else {
            console.error("Request not found");
        }
    };

    if (!requestDetails) {
        return <div>Loading request details...</div>;
    }

    return (
        <>
            <div className="content-container1">
                <h1>View Full Requests</h1>
                <div className="card-container1">
                    <div className="card1">
                        <h2>{requestDetails.Title}</h2>
                        <p><strong>ID:</strong> {requestDetails.ID}</p>
                        <p><strong>Resource:</strong> {requestDetails.Resource}</p>
                        <p><strong>Start Date:</strong> {requestDetails["Start Date"]}</p>
                        <p><strong>End Date:</strong> {requestDetails["End Date"]}</p>
                        <p><strong>Description:</strong> {requestDetails.Description}</p>
                        <p><strong>Trainer ID:</strong> {requestDetails["Trainer ID"]}</p>
                        <p><strong>Duration:</strong> {requestDetails.Duration}</p>
                        <p><strong>Venue Details:</strong> {requestDetails["Venue Details"]}</p>
                        <p><strong>Request Status:</strong> {requestDetails["Request Status"]}</p>
                        <p><strong>Remarks:</strong> {requestDetails.Remarks}</p>
                        <p><a href="#">{requestDetails.View}</a></p>
                    </div>
                </div>
                {/* New Dropdown for Training Status */}
                <div className="dropdown-container">
                    <label htmlFor="trainingStatus" >Training Status</label>
                    <select className="form-select"
                        
                        value={trainingStatus}
                        onChange={(e) => setTrainingStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Not Yet Started">Not Yet Started</option>
                        <option value="Registration Completed">Registration Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div>
                    <Link to="/dashboard/track-request">
                        <button className="form-btn" onClick={() => alert("Training status is updated")}>Save</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default UserViewRequests;
