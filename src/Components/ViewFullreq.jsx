import React, { useEffect, useState } from "react";
import './Dashboard.css';
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import './RequestForm.css';

const ViewFullreq = () => {
    const location = useLocation();
    const { state } = location;

    const [requests, setRequests] = useState([])
    useEffect(() => {
        const initialData = [{
            "id": 9446,
            "Student": "PRIYADHARSHINI-SURVEY SPARROW-Start Date:2023-01-26 End Date:2023-02-26",
            "Start date": "2023-01-26",
            "End date": "2023-02-26",
            "Duration(in weeks)": 6,
            "Year of study": "Second",
            "Special lab": "SLB056-XR STUDIO-PRODUCT DEVELOPMENT",
            "Sector": "Private",
            "Industry Address Line1": "Gandhipuram",
            "City": "Coimbatore",
            "State": "Tamilnadu",
            "Postal Code": 641012,
            "Country": "India",
            "Industry website": "www.nandhainfotech.com",
            "Industry contact details": "info@nandhainfotech.com",
            "IQAC Verification": "Approved",
            "Rewards": "No",
            "Elective chosen": "6",
            "Status": "Pending",
            "Timestamp": "4/12/2024, 10:04:02 AM",
            "Remarks": " "
        }, {
            "id": 1005,
            "Student": "PRIYADHARSHINI-GROOTAN-Start Date:2023-01-26 End Date:2023-02-26",
            "Start date": "2023-01-26",
            "End date": "2023-02-26",
            "Duration(in weeks)": 6,
            "Year of study": "Second",
            "Special lab": "SLB056-XR STUDIO-PRODUCT DEVELOPMENT",
            "Sector": "Private",
            "Industry Address Line1": "Gandhipuram",
            "City": "Coimbatore",
            "State": "Tamilnadu",
            "Postal Code": 641012,
            "Country": "India",
            "Industry website": "www.nandhainfotech.com",
            "Industry contact details": "info@nandhainfotech.com",
            "IQAC Verification": "Approved",
            "rewards": "No",
            "elective chosen": "8",
            "status": "Pending",
            "timestamp": "4/12/2024, 10:10:02 PM",
            "remarks": "  "
        },
        {
            "id": 1005,
            "Student": "PRIYADHARSHINI-GROOTAN-Start Date:2023-01-26 End Date:2023-02-26",
            "Start date": "2023-01-26",
            "End date": "2023-02-26",
            "Duration(in weeks)": 6,
            "Year of study": "Second",
            "Special lab": "SLB056-XR STUDIO-PRODUCT DEVELOPMENT",
            "Sector": "Private",
            "Industry Address Line1": "Gandhipuram",
            "City": "Coimbatore",
            "State": "Tamilnadu",
            "Postal Code": 641012,
            "Country": "India",
            "Industry website": "www.nandhainfotech.com",
            "Industry contact details": "info@nandhainfotech.com",
            "IQAC Verification": "Approved",
            "rewards": "No",
            "elective chosen": "7",
            "status": "Approved",
            "timestamp": "4/12/2024, 10:10:02 PM"
        }, {

            "id": 1005,
            "Student": "PRIYADHARSHINI-GROOTAN-Start Date:2023-01-26 End Date:2023-02-26",
            "Start date": "2023-01-26",
            "End date": "2023-02-26",
            "Duration(in weeks)": 6,
            "Year of study": "Second",
            "Special lab": "SLB056-XR STUDIO-PRODUCT DEVELOPMENT",
            "Sector": "Private",
            "Industry Address Line1": "Gandhipuram",
            "City": "Coimbatore",
            "State": "Tamilnadu",
            "Postal Code": 641012,
            "Country": "India",
            "Industry website": "www.nandhainfotech.com",
            "Industry contact details": "info@nandhainfotech.com",
            "IQAC Verification": "Approved",
            "Rewards": "No",
            "Elective chosen": "7",
            "Status": "Rejected",
            "Timestamp": "4/12/2024, 10:10:02 PM",
            "Remarks": " "

        }]
        setRequests(initialData)
    }, [])
    const user = requests.find(user => user.id === parseInt(location.state.id));
    const data = { "id": 9446, "pdf": "Resume" }
    console.log(user)
    useEffect(() => {
        if (user) {
            localStorage.setItem('userState', JSON.stringify(user));
            const storedState = JSON.parse(localStorage.getItem('userState')) || {};
            console.log("Stored State is ", storedState);
        }
    }, [user]);

    const showPdf = () => {
        console.log("show pdf called")
        window.open("https://drive.google.com/file/d/1qeN4oJ8Pbu-zfVM8LhZty8awIg9WW9TB/view?usp=sharing", "_blank", "noreferrer");
        // setPdfFile(`http://localhost:5000/files/${pdf}`)
    };
    return (
        <>
            <div className="content-container1">
                <h1>View Full Requests</h1>
                <div className="table-container1">

                    {user ? (
                        <table className="form-table">
                            <tbody>
                                {Object.entries(user).map(([key, value]) => (
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
                                    <td className="label-cell" id="form-label">Uploaded Pdf file

                                        

                                    </td>
                                    <div className="pdf-container">
                                    <p id="doc-name">{data.pdf}</p>
                                    <button className="form-btn2" onClick={showPdf}>
                                            View Pdf
                                    </button>
                                    </div>


                                </tr>


                            </tbody>
                        </table>

                    ) : (
                        <p>No user found</p>
                    )}
                </div>

                <div ><Link to="/admin/view-requests"><button className="form-btn" id="add-entry">Go Back</button></Link></div>

            </div>
        </>
    );
};

export default ViewFullreq;
