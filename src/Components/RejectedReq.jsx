import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './AdminRequests.css'
import './Dashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faSearch } from "@fortawesome/free-solid-svg-icons";
const RejectedReq = () => {
    const[requests, setRequests] = useState([])
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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
            "rewards": "No",
            "elective chosen": "6",
            "status": "Pending",
            "timestamp": "4/12/2024, 10:04:02 AM",
            "remarks": " "
        }, {
            "id": 1006,
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
            "elective chosen": "6",
            "status": "Rejected",
            "timestamp": "4/12/2024, 10:10:02 PM",
            "Remarks": "File name is wrong"
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
            "rewards": "No",
            "elective chosen": "7",
            "status": "Rejected",
            "timestamp": "4/12/2024, 10:10:02 PM",
            "Remarks":"Please Upload Correct file"

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
            "elective chosen": "9",
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
            "rewards": "No",
            "elective chosen": "9",
            "status": "Approved",
            "timestamp": "4/12/2024, 10:10:02 PM"

        }]
        setRequests(initialData)
        setItems(initialData)
    }, [])
    const newrequests = requests.filter(request => request.status === "Rejected")
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentRequests = newrequests.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(requests.length / itemsPerPage);
    const searchfn = (e) => {
        const getSearch = e.target.value;
        setSearchValue(getSearch)

        if (getSearch.length > 0) {
            const filteredItems = newrequests.filter((request) =>
                String(request.id).includes(searchValue)
            );
            setRequests(filteredItems)
        }
        else{
            setRequests(items)
        }
    }
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleView = (id) => {
        console.log(id, "button clicked")
        navigate('/admin/view-full-req/', { state: { "id": id } })
    }
    return (
        <>
            <div className="content-container">
                <h1>Rejected Requests</h1>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} />

                    <input placeholder="Search here" onChange={searchfn} value={searchValue}></input>
                </div>
                <div className="table1-container">
                    <table>
                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Duration in weeks</th>

                                <th>Rewards Claimmed</th>
                                <th>Elective Chosen</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                                <th>Remarks</th>
                                
                                <th>View</th>

                            </tr>
                        </thead>
                        {requests && currentRequests.map((request, index) => (
                            <>

                                <tbody id="requests-table-body" key={index}>
                                    <tr>
                                        <td>{request.id}</td>
                                        <td>{request.Student}</td>
                                        <td>{request["Duration(in weeks)"]}</td>

                                        <td>{request.rewards}</td>
                                        <td>{request["elective chosen"]}</td>
                                        

                                        <td>{request.timestamp}</td>
                                        <div className="status-admin">
                                            {request.status === "Pending" ?
                                                <>
                                                    <button className="approve" onClick={() => handleApprove(request.id)}>Approve</button>
                                                    <button className="reject" onClick={() => handleReject(request.id)}>Reject</button>
                                                </>
                                                : request.status === "Approved" ? <span className="status-approved"><p>Approved</p></span> : <span className="status-rejected"><p>Rejected</p></span>
                                            }

                                        </div>
                                        <td>{request.Remarks}</td>
                                        <td>
                                            <button className="view-icon" onClick={() => { handleView(request.id) }}><FontAwesomeIcon icon={faEye} /></button>
                                        </td>

                                    </tr>
                                </tbody>
                            </>
                        ))}
                    </table>

                </div>
                <div className="pagination">
                    <button  onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : "prev"}>Previous</button>

                    <span className="total-pages">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled": "next"}>Next</button>
                </div>




            </div>

        </>
    )
}
export default RejectedReq