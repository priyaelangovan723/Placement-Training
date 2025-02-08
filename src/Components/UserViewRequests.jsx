import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import '../Styles/Dashboard.css';
import './RequestForm.css';
import { Link } from "react-router-dom";

const UserViewRequests = () => {
    const location = useLocation();
    const { id } = location.state || {}; // Retrieve the ID passed via navigate
    const [requestDetails, setRequestDetails] = useState(null);

    useEffect(() => {
        // Fetch the appropriate request details based on ID
        if (id) {
            fetchRequestDetails(id);
        }
    }, [id]);

    const fetchRequestDetails = (id) => {
        // Replace this with your backend API or data-fetching logic
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
                "Submitted On": "1/15/2024, 10:04:02 AM", // Fixed timestamp
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

                "Trainer ID": "T1002",
                "Duration": "2 weeks",
                "Apex Details": "Hybrid training with online and in-person sessions",
                "Venue Details": "Coimbatore, ABC Tech Hub",
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

                "Trainer ID": "T1003",
                "Duration": "3 weeks",

                "Venue Details": "Virtual session via Microsoft Teams",
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

                "Trainer ID": "T1004",
                "Duration": "2 weeks",
                "Apex Details": "Self-paced learning with webinars for Q&A",
                "Venue Details": "Available on the course portal",
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

                "Trainer ID": "T1005",
                "Duration": "2 weeks",
                "Apex Details": "Hands-on training with code examples and assignments",
                "Venue Details": "Coimbatore, XYZ Learning Center",
                "Submitted On": "4/25/2024, 8:15:00 AM", // Fixed timestamp
                "Request Status": "Approved",
                "Remarks": "Course completed with positive feedback from participants",
                "View": "Link to feedback form"
            }
        ]
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
                <div className="table-container1">

                    {requestDetails ? (
                        <table className="form-table">
                            <tbody>
                                {Object.entries(requestDetails).map(([key, value]) => (
                                    <tr key={key}>
                                        <td className="label-cell" id="form-label">{key}</td>
                                        <td>
                                            {key === "status" ? (
                                                <select className="form-select" value={value}>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            ) : (
                                                <select className="form-select" value={value} onChange={(e) => handleChange(key, e.target.value)}>
                                                    <option value={value}>{value}</option>
                                                </select>
                                            )}
                                        </td>
                                    </tr>

                                ))}

                                <tr>
                                    <td className="label-cell" id="form-label">Training Status</td>
                                    <td>
                                        <select
                                            name="training_status"
                                            
                                            className="form-select"
                                        >
                                            <option value="">Select</option>
                                            <option value="Not Yet Started">Not Yet Started</option>
                                            <option value="Registration ">Registration Completed</option>
                                            <option value="Ongoing">Ongoing</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        
                                    </td>


                                </tr>

                                



                            </tbody>
                        </table>

                    ) : (
                        <p>No user found</p>
                    )}
                </div>

                <div ><Link to="/dashboard/track-request"><button className="form-btn" id="add-entry" onClick={() => alert("Training status is updated")}>Save</button></Link></div>

            </div>
        </>
    );
};

export default UserViewRequests;
