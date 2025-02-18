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
            },
            {
                "ID": 102,
                "Title": "ReactJS Fundamentals",
                "Resource": "Outside BIT",
                "Start Date": "2024-03-05",
                "End Date": "2024-03-20",
                "Description": "A fundamental training on ReactJS to build interactive web interfaces.",
                "Training Status": "In Progress",
                "Trainer ID": "T1002",
                "Duration": "15",
                "Domain": " ",
                "Apex Details": "Hybrid training with online and in-person sessions",
                "Venue Details": "SF Seminar Hall -II",
                "Submitted On": "2/10/2024, 2:20:15 PM", // Fixed timestamp
                "Request Status": "Rejected",
                "Remarks": "Insufficient Apex Details",
                "View": "Link to current sessions"
            },
            {
                "ID": 103,
                "Title": "Backend Development with Node.js",
                "Resource": "Inside BIT",
                "Start Date": "2024-04-01",
                "End Date": "2024-04-20",
                "Description": "Training focused on backend development using Node.js and Express.js.",
                "Training Status": "Not Started",
                "Trainer ID": "T1003",
                "Duration": "25",
                "Domain": " ",
                "Venue Details": "SF Seminar Hall -III",
                "Submitted On": "3/5/2024, 9:30:45 AM", // Fixed timestamp
                "Request Status": "Approved",
                "Remarks": "Pre-training preparations are underway",
                "View": "Link to upcoming sessions"
            },
            {
                "ID": 104,
                "Title": "Mobile App Development with Flutter",
                "Resource": "Outside BIT",
                "Start Date": "2024-06-01",
                "End Date": "2024-06-15",
                "Description": "Comprehensive training on developing mobile applications using the Flutter framework.",
                "Training Status": "Not Started",
                "Trainer ID": "T1004",
                "Duration": "18",
                "Domain": " ",
                "Apex Details": "Self-paced learning with webinars for Q&A",
                "Venue Details": "SF Seminar Hall - I",
                "Submitted On": "4/10/2024, 11:05:30 AM", // Fixed timestamp
                "Request Status": "Pending",
                "Remarks": "Awaiting confirmation for trainer scheduling",
                "View": "Link to course details"
            },
            {
                "ID": 105,
                "Title": "JavaScript ES6+ Features",
                "Resource": "Outside BIT",
                "Start Date": "2024-05-10",
                "End Date": "2024-05-25",
                "Description": "Training covering the latest features of JavaScript ES6+ for modern web development.",
                "Training Status": "Completed",
                "Trainer ID": "T1005",
                "Duration": "28",
                "Domain": " ",
                "Apex Details": "Hands-on training with code examples and assignments",
                "Venue Details": "ECE Seminar Hall",
                "Submitted On": "4/25/2024, 8:15:00 AM", // Fixed timestamp
                "Request Status": "Approved",
                "Remarks": "Course completed with positive feedback from participants",
                "View": "Link to feedback form"
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
