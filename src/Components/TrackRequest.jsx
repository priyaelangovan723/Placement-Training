import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import '../Styles/Dashboard.css';
import '../Styles/TrackRequest.css'
import './YourRequests.css'


const TrackRequest = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([])
    const [searchValue, setSearchValue] = useState('');

    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const itemsPerPage = 10;
    useEffect(() => {
        const initialData = [
            {
                "ID": 101,
                "Title": "Advanced Python Training",
                "Resource": "Inside BIT",
                "Start Date": "2024-02-01",
                "End Date": "2024-02-28",
                "Description": "An advanced training program on Python covering advanced topics like data analysis and machine learning.",
                "Training Status": "Completed",
                "Trainer ID": "T1001",
                "Duration": "22",
                "Domain": " ",
                "Venue Details": "Bio Tech Seminar Hall",
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
        ]
        setRequests(initialData)
        setItems(initialData)
    }, [])
    const searchfn = (e) => {
        const getSearch = e.target.value;
        setSearchValue(getSearch)

        if (getSearch.length > 0) {
            const filteredItems = requests.filter((request) =>
                String(request.ID).includes(searchValue)
            );
            setRequests(filteredItems)
        }
        else {
            setRequests(items)
        }
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handleView = (id) => {
        console.log(id, "button clicked")
        navigate('/dashboard/view-full-req/', { state: { "id": id } })
    }

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <>
            <div className="content-container">
                <h1>Track Your Submitted Request</h1>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />

                    <input placeholder="Search here" onChange={searchfn} value={searchValue}></input>
                </div>
                <div className="table1-container">
                    <div className="table-wrapper">
                        <table>
                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Resource</th>
                                    <th>Domain</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Description</th>
                                    
                                    <th>Trainer ID</th>
                                    <th>Duration(in days)</th>
                                    <th>Apex Details</th>
                                    <th>Venue Details</th>
                                    <th>Submitted On</th>
                                    <th>Request Status</th>
                                    <th>Remarks</th>
                                    <th>Training Status</th>
                                    {/* <th>View</th> */}
                                </tr>
                            </thead>
                            {requests.map((request) => (
                                <>

                                    <tbody>
                                        <tr>
                                            <td>{request.ID}</td>
                                            <td>{request.Title}</td>
                                            <td>{request.Resource}</td>
                                            <td>{request.Domain}</td>
                                            <td>{request["Start Date"]}</td>
                                            <td>{request["End Date"]}</td>
                                            <td>{request.Description}</td>
                                            
                                            <td>{request["Trainer ID"]}</td>
                                            <td>{request.Duration}</td>
                                            <td>{request["Apex Details"]}</td>
                                            <td>{request["Venue Details"]}</td>

                                            <td>{request["Submitted On"]}</td>
                                            <div className={request["Request Status"] === "Approved" ? "approved" : request["Request Status"] === "Rejected" ? "rejected" : "pending"}>
                                                <td><span id="status-text">{request["Request Status"]}</span></td>
                                            </div>
                                            {request["Request Status"] === "Approved" ?
                                                <td>{ }</td> :
                                                request["Request Status"] === "Rejected" ?
                                                    <td>{request.Remarks}</td>
                                                    :
                                                    <td>{ }</td>
                                            }
                                            {request["Request Status"] === "Approved" ?
                                                <td> <button className="view-icon" onClick={() => { handleView(request.ID) }}><FontAwesomeIcon icon={faPenToSquare} /></button> </td>
                                                :
                                                <td>{ }</td>
                                            }


                                        </tr>
                                    </tbody>
                                </>
                            ))}
                        </table>
                    </div>
                    <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : "prev"}>Previous</button>

                        <span className="total-pages">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : "next"}>Next</button>
                    </div>
                </div>

            </div>
        </>

    )
}
export default TrackRequest