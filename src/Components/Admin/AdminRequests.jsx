import React, { useEffect, useState } from "react";
import '../../Styles/AdminRequests.css'
import '../../Styles/Dashboard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import '../../Styles/TrackRequest.css'

const AdminRequests = () => {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([])
    const [searchValue, setSearchValue] = useState('');
    const [remarksValue, setRemarksValue] = useState({});
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
                "Apex Details": " ",
                "Domain": "Software Development",
                "Venue Details": "Bio Tech Seminar Hall",
                "Submitted On": "1/15/2024, 10:04:02 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to course material"
            },
            {
                "ID": 102,
                "Title": "Data Science Bootcamp",
                "Resource": "Outside BIT",
                "Start Date": "2024-03-01",
                "End Date": "2024-03-31",
                "Description": "Intensive bootcamp covering topics in data science, including statistics, machine learning, and data visualization.",
                "Training Status": " ",
                "Trainer ID": "T1002",
                "Duration": "30",
                "Apex Details":"Tech University.pdf",
                "Vendor Name" : "Tech University",
                "Domain": "Data Science",
                "Venue Details": "Tech Hall 2",
                "Submitted On": "2/1/2024, 9:30:00 AM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to ongoing course material"
            },
            {
                "ID": 103,
                "Title": "AI Research Fundamentals",
                "Resource": "Outside BIT",
                "Start Date": "2024-01-15",
                "End Date": "2024-02-15",
                "Description": "An introductory course on artificial intelligence and machine learning basics.",
                "Training Status": "Completed",
                "Trainer ID": "T1003",
                "Duration": "32",
                "Apex Details":"Future Labs.pdf",
                "Vendor Name" : "Future Labs Tech",
                "Domain": "Artificial Intelligence",
                "Venue Details": "Tech Research Auditorium",
                "Submitted On": "12/20/2023, 11:45:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to course summary"
            },
            {
                "ID": 104,
                "Title": "Web Development Essentials",
                "Resource": "Inside BIT",
                "Start Date": "2024-04-01",
                "End Date": "2024-04-30",
                "Description": "A full-stack web development program, focusing on front-end and back-end technologies.",
                "Training Status": " ",
                "Trainer ID": "T1004",
                "Duration": "30",
                "Domain": "Web Development",
                "Apex Details":"",
                "Vendor Name" : " ",
                "Venue Details": "Web Dev Lab 1",
                "Submitted On": "2/15/2024, 10:15:00 AM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to course outline"
            },
            {
                "ID": 105,
                "Title": "Machine Learning in Practice",
                "Resource": "Outsie BIT",
                "Start Date": "2024-02-05",
                "End Date": "2024-03-05",
                "Description": "Hands-on machine learning workshop focusing on practical applications in various industries.",
                "Training Status": "Completed",
                "Trainer ID": "T1005",
                "Duration": "28",
                "Domain": "Machine Learning",
                "Apex Details":"Tech Institute.pdf",
                "Vendor Name" : "Tech Institute",
                "Venue Details": "Innovation Hall",
                "Submitted On": "1/10/2024, 11:00:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to workshop results"
            },
            {
                "ID": 106,
                "Title": "OOPS",
                "Resource": "Inside BIT",
                "Start Date": "2024-03-10",
                "End Date": "2024-04-10",
                "Description": "A beginner's guide to OOPS and MCQ'S.",
                "Training Status": " ",
                "Trainer ID": "T1006",
                "Duration": "30",
                "Domain": "Blockchain",
                "Venue Details": "Crypto Seminar Room",
                "Submitted On": "2/5/2024, 8:20:00 AM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to blockchain curriculum"
            },
            {
                "ID": 107,
                "Title": "Cybersecurity Essentials",
                "Resource": "Cyber Sec Labs",
                "Start Date": "2024-03-15",
                "End Date": "2024-04-15",
                "Description": "A comprehensive training program to understand cybersecurity fundamentals and best practices.",
                "Training Status": " ",
                "Trainer ID": "T1007",
                "Duration": "30",
                "Domain": "Cybersecurity",
                "Venue Details": "Cybersecurity Lab",
                "Submitted On": "2/10/2024, 2:10:00 PM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to upcoming cybersecurity modules"
            },
            {
                "ID": 108,
                "Title": "Advanced Web Technologies",
                "Resource": "Tech Solutions",
                "Start Date": "2024-04-01",
                "End Date": "2024-05-01",
                "Description": "A deep dive into modern web technologies like React, Node.js, and GraphQL.",
                "Training Status": " ",
                "Trainer ID": "T1008",
                "Duration": "30",
                "Domain": "Web Development",
                "Venue Details": "Tech Solutions Classroom",
                "Submitted On": "2/20/2024, 12:30:00 PM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to detailed syllabus"
            },
            {
                "ID": 109,
                "Title": "Cloud Computing 101",
                "Resource": "CloudTech Corp",
                "Start Date": "2024-02-10",
                "End Date": "2024-03-10",
                "Description": "An introductory course on cloud computing, covering AWS, Azure, and Google Cloud.",
                "Training Status": "Completed",
                "Trainer ID": "T1009",
                "Duration": "30",
                "Domain": "Cloud Computing",
                "Venue Details": "CloudTech Office",
                "Submitted On": "1/25/2024, 10:00:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to cloud computing course"
            },
            {
                "ID": 110,
                "Title": "Robotics Fundamentals",
                "Resource": "Robotics Lab",
                "Start Date": "2024-04-05",
                "End Date": "2024-05-05",
                "Description": "A hands-on program focused on robotics and automation.",
                "Training Status": " ",
                "Trainer ID": "T1010",
                "Duration": "30",
                "Domain": "Robotics",
                "Venue Details": "Robotics Workshop Room",
                "Submitted On": "2/25/2024, 4:00:00 PM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to robotics overview"
            },
            {
                "ID": 111,
                "Title": "Introduction to UX/UI Design",
                "Resource": "Design Academy",
                "Start Date": "2024-02-20",
                "End Date": "2024-03-20",
                "Description": "Learn the fundamentals of UX and UI design, including wireframing, prototyping, and user testing.",
                "Training Status": "Completed",
                "Trainer ID": "T1011",
                "Duration": "30",
                "Domain": "Design",
                "Venue Details": "Design Lab",
                "Submitted On": "2/5/2024, 9:00:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to design course content"
            },
            {
                "ID": 112,
                "Title": "Digital Marketing Strategies",
                "Resource": "Marketing Academy",
                "Start Date": "2024-03-01",
                "End Date": "2024-03-31",
                "Description": "A comprehensive course on digital marketing, including SEO, SEM, content marketing, and social media strategies.",
                "Training Status": " ",
                "Trainer ID": "T1012",
                "Duration": "30",
                "Domain": "Marketing",
                "Venue Details": "Marketing Room 1",
                "Submitted On": "2/10/2024, 11:15:00 AM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to marketing resources"
            },
            {
                "ID": 113,
                "Title": "Financial Analysis Masterclass",
                "Resource": "Finance Experts",
                "Start Date": "2024-03-15",
                "End Date": "2024-04-15",
                "Description": "An advanced program on financial analysis, focusing on financial modeling and valuation techniques.",
                "Training Status": " ",
                "Trainer ID": "T1013",
                "Duration": "31",
                "Domain": "Finance",
                "Venue Details": "Finance Lab",
                "Submitted On": "2/15/2024, 10:00:00 AM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to finance course materials"
            },
            {
                "ID": 114,
                "Title": "Introduction to Agile Methodologies",
                "Resource": "Agile Academy",
                "Start Date": "2024-02-25",
                "End Date": "2024-03-25",
                "Description": "Learn the core principles of Agile, Scrum, and Kanban methodologies and their application in software development.",
                "Training Status": "Completed",
                "Trainer ID": "T1014",
                "Duration": "28",
                "Domain": "Project Management",
                "Venue Details": "Agile Room",
                "Submitted On": "2/10/2024, 10:15:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to agile training modules"
            },
            {
                "ID": 115,
                "Title": "Artificial Intelligence for Business",
                "Resource": "Business Tech Academy",
                "Start Date": "2024-04-01",
                "End Date": "2024-04-30",
                "Description": "Understand the role of AI in business transformation, with case studies and practical implementation.",
                "Training Status": " ",
                "Trainer ID": "T1015",
                "Duration": "30",
                "Domain": "Business Tech",
                "Venue Details": "Business Tech Room",
                "Submitted On": "2/20/2024, 3:10:00 PM",
                "Request Status": "Pending",
                "Remarks": " ",
                "View": "Link to AI in business course"
            },
            {
                "ID": 116,
                "Title": "Full Stack Development Bootcamp",
                "Resource": "Dev Academy",
                "Start Date": "2024-02-01",
                "End Date": "2024-02-28",
                "Description": "A comprehensive bootcamp covering front-end and back-end technologies for building full-stack web applications.",
                "Training Status": "Completed",
                "Trainer ID": "T1016",
                "Duration": "28",
                "Domain": "Software Development",
                "Venue Details": "Dev Lab",
                "Submitted On": "1/25/2024, 4:00:00 PM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to bootcamp materials"
            },
            {
                "ID": 117,
                "Title": "Cloud Infrastructure Management",
                "Resource": "Cloud Tech Academy",
                "Start Date": "2024-02-15",
                "End Date": "2024-03-15",
                "Description": "Learn about the management and deployment of cloud infrastructure, including AWS and Azure environments.",
                "Training Status": "Completed",
                "Trainer ID": "T1017",
                "Duration": "30",
                "Domain": "Cloud Computing",
                "Venue Details": "Cloud Tech Lab",
                "Submitted On": "2/5/2024, 9:45:00 AM",
                "Request Status": "Approved",
                "Remarks": " ",
                "View": "Link to cloud management course"
            }
        ];

        setRequests(initialData)
        setItems(initialData)
    }, [])

    const handleApprove = (id) => {
        const updatedRequests = requests.map(request => {
            if (request['ID'] === id) {
                return { ...request, "Request Status": "Approved" };
            }
            return request;
        });
        console.log(updatedRequests)
        setRequests(updatedRequests)
    };


    const handleReject = (id) => {
        const updatedRequests = requests.map(request => {
            if (request['ID'] === id) {
                return { ...request, "Request Status": "Rejected" };
            }
            return request;
        });
        console.log(updatedRequests)
        setRequests(updatedRequests)
    };

    const handleRemarksChange = (id, value) => {
        console.log(id, value)
        setRemarksValue({ ...remarksValue, [id]: value });
        console.log(remarksValue[id])
    };

    const handleSubmitRemarks = (id) => {
        setSelectedRequestId(id)
        if (selectedRequestId !== null) {

            const updatedRequests = requests.map(request => {
                if (request['ID'] === selectedRequestId) {
                    return { ...request, "Remarks": remarksValue[id] };
                }
                return request;
            });
            setRequests(updatedRequests);
            console.log(updatedRequests)
            setRemarksValue('');
            setSelectedRequestId(null);
        }
    };

    const searchfn = (e) => {
        const getSearch = e.target.value;
        setSearchValue(getSearch)

        if (getSearch.length > 0) {
            const filteredItems = items.filter((request) =>
                String(request['ID']).includes(getSearch)
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



    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    const handleView = (id) => {
        console.log(id, "button clicked")
        navigate('/admin/view-full-request', { state: { "id": id } })
    }
    return (
        <>
            <div className="content-container">
                <h1>Submitted Requests</h1>
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
                                    <th>Duration (in days)</th>
                                    <th>Apex Details</th>
                                    <th>Vendor Name</th>
                                    <th>Venue Details</th>
                                    <th>Submitted On</th>
                                    <th>Request Status</th>
                                    <th>Remarks</th>
                                    <th>Training Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                          
                                {requests && currentRequests.map((request, index) => (
                                    <>
                                      <tbody id="requests-table-body" key={index}>
                                    <tr>
                                        <td>{request['ID']}</td>
                                        <td>{request['Title']}</td>
                                        <td>{request["Resource"]}</td>
                                        <td>{request["Domain"]}</td>
                                        <td>{request["Start Date"]}</td>
                                        <td>{request["End Date"]}</td>
                                        <td>{request["Description"]}</td>
                                        <td>{request["Trainer ID"]}</td>
                                        <td>{request["Duration"]}</td>
                                        <td>{request["Apex Details"]}</td>
                                        <td>{request["Vendor Name"]}</td>
                                        <td>{request["Venue Details"]}</td>
                                        <td>{request["Submitted On"]}</td>
                                        
                                        
                                            <div className="status-admin">
                                                {request["Request Status"] === "Pending" ?
                                                    <>
                                                        <button className="approve" onClick={() => handleApprove(request['ID'])}>Approve</button>
                                                        <button className="reject" onClick={() => handleReject(request['ID'])}>Reject</button>
                                                    </>
                                                    : request["Request Status"] === "Approved" ?
                                                        <span className="status-approved"><p>Approved</p></span> :
                                                        <span className="status-rejected"><p>Rejected</p></span>
                                                }
                                            </div>
                                        
                                        <td>
                                            {
                                                request["Request Status"] === "Rejected" && request["Remarks"] === " " ?
                                                    <>
                                                        <input id="remarks" type="text" placeholder={request["Remarks"]} value={remarksValue[request["ID"]]} onChange={(e) => handleRemarksChange(request['ID'], e.target.value)} />
                                                        <button id="submit-btn" onClick={() => handleSubmitRemarks(request['ID'])} >Submit</button>
                                                    </>
                                                    :
                                                    <div>{request["Remarks"]}</div>
                                            }
                                        </td>
                                        <td>{request["Training Status"]}</td>
                                        <td>
                                            <button className="view-icon" onClick={() => { handleView(request['ID']) }}><FontAwesomeIcon icon={faEye} /></button>
                                        </td>
                                    </tr>
                                
                            </tbody>
                            </>
                            ))}
                        </table>
                    </div>
                </div>

                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : "prev"}>Previous</button>

                    <span className="total-pages">{`Page ${currentPage} of ${totalPages}`}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : "next"}>Next</button>
                </div>




            </div>

        </>
    )
}
export default AdminRequests