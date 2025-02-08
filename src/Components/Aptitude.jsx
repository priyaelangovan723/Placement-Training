import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import '../Styles/Dashboard.css';
import '../Styles/TrackRequest.css'
import './YourRequests.css'

import './Aptitude.css'

const Aptitude = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const itemsPerPage = 10;

    useEffect(() => {
        const initialData = [
            {
                "courseID": 101,
                "courseTitle": "Advanced Python Training",
                "students": [
                    {
                        "studentID": "S1001",
                        "studentName": "John Doe",
                        "Roll No":"7376222IT151",
                        "enrollmentDate": "2024-01-20",
                        "status": "Active",
                        "contactInfo": {
                            "email": "john.doe@example.com",
                            "phone": "123-456-7890"
                        },
                        "attendance": [
                            { "date": "2024-01-21", "status": "Present" },
                            { "date": "2024-01-22", "status": "Absent" },
                            { "date": "2024-01-23", "status": "Present" }
                        ],
                        "overallAttendanceScore": 66.67, // 2 out of 3 days present
                        "absentDates": ["2024-01-22"]
                    },
                    {
                        "studentID": "S1002",
                        "studentName": "Jane Smith",
                        "Roll No":"7376222ISE151",
                        "enrollmentDate": "2024-01-22",
                        "status": "Active",
                        "contactInfo": {
                            "email": "jane.smith@example.com",
                            "phone": "234-567-8901"
                        },
                        "attendance": [
                            { "date": "2024-01-22", "status": "Present" },
                            { "date": "2024-01-23", "status": "Absent" },
                            { "date": "2024-01-24", "status": "Present" }
                        ],
                        "overallAttendanceScore": 66.67, // 2 out of 3 days present
                        "absentDates": ["2024-01-23"]
                    }
                ]
            },
            {
                "courseID": 102,
                "courseTitle": "ReactJS Fundamentals",
                "students": [
                    {
                        "studentID": "S1003",
                        "studentName": "Alice Johnson",
                        "Roll No":"7376222AD151",
                        "enrollmentDate": "2024-02-05",
                        "status": "Active",
                        "contactInfo": {
                            "email": "alice.johnson@example.com",
                            "phone": "345-678-9012"
                        },
                        "attendance": [
                            { "date": "2024-02-06", "status": "Present" },
                            { "date": "2024-02-07", "status": "Absent" },
                            { "date": "2024-02-08", "status": "Present" }
                        ],
                        "overallAttendanceScore": 66.67, // 2 out of 3 days present
                        "absentDates": ["2024-02-07"]
                    },
                    {
                        "studentID": "S1004",
                        "studentName": "Bob Brown",
                        "Roll No":"7376222CB160",
                        "enrollmentDate": "2024-02-10",
                        "status": "Completed",
                        "contactInfo": {
                            "email": "bob.brown@example.com",
                            "phone": "456-789-0123"
                        },
                        "attendance": [
                            { "date": "2024-02-11", "status": "Present" },
                            { "date": "2024-02-12", "status": "Present" },
                            { "date": "2024-02-13", "status": "Absent" }
                        ],
                        "overallAttendanceScore": 66.67, // 2 out of 3 days present
                        "absentDates": ["2024-02-13"]
                    }
                ]
            },
            {
                "courseID": 103,
                "courseTitle": "Backend Development with Node.js",
                "students": [
                    {
                        "studentID": "S1005",
                        "studentName": "Charlie Davis",
                        "Roll No":"7376222CT154",
                        "enrollmentDate": "2024-03-01",
                        "status": "Pending",
                        "contactInfo": {
                            "email": "charlie.davis@example.com",
                            "phone": "567-890-1234"
                        },
                        "attendance": [
                            { "date": "2024-03-02", "status": "Absent" },
                            { "date": "2024-03-03", "status": "Absent" },
                            { "date": "2024-03-04", "status": "Present" }
                        ],
                        "overallAttendanceScore": 33.33, // 1 out of 3 days present
                        "absentDates": ["2024-03-02", "2024-03-03"]
                    }
                ]
            },
            {
                "courseID": 104,
                "courseTitle": "Mobile App Development with Flutter",
                "students": [
                    {
                        "studentID": "S1006",
                        "studentName": "David Lee",
                        "Roll No":"7376222CS151",
                        "enrollmentDate": "2024-04-05",
                        "status": "Active",
                        "contactInfo": {
                            "email": "david.lee@example.com",
                            "phone": "678-901-2345"
                        },
                        "attendance": [
                            { "date": "2024-04-06", "status": "Present" },
                            { "date": "2024-04-07", "status": "Absent" },
                            { "date": "2024-04-08", "status": "Present" }
                        ],
                        "overallAttendanceScore": 66.67, // 2 out of 3 days present
                        "absentDates": ["2024-04-07"]
                    }
                ]
            }
        ]


        setStudents(initialData);
        setItems(initialData);
    }, []);

    const searchfn = (e) => {
        const getSearch = e.target.value;
        setSearchValue(getSearch);

        if (getSearch.length > 0) {
            const filteredItems = students.filter((course) =>
                course.courseTitle.toLowerCase().includes(getSearch.toLowerCase()) ||
                course.students.some(student => student.studentName.toLowerCase().includes(getSearch.toLowerCase()))
            );
            setStudents(filteredItems);
        } else {
            setStudents(items);
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentCourses = students.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="content-container">
            <h1>Track Students Enrolled in Courses</h1>
            <div className="reports">
                <h4>Download Reports</h4>
                <div className="attendance-reports">
                    <button className="dwnld-btn">Download Attendance Report</button>
                </div>
                <div className="assessment-reports">
                    <button className="dwnld-btn">Download Asessment Report</button>
                </div>
            </div>
            <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} />
                <input placeholder="Search by course or student name" onChange={searchfn} value={searchValue} />
            </div>
            <div className="table1-container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Title</th>
                                <th>Student Name</th>
                                <th>Roll No</th>
                                <th>Enrollment Date</th>
                                <th>Status</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Attendance</th>
                                <th>Overall Attendance Score</th>
                                <th>Absent Dates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCourses.map(course => (
                                course.students.map(student => (
                                    <tr key={student.studentID}>
                                        <td>{course.courseID}</td>
                                        <td>{course.courseTitle}</td>
                                        <td>{student.studentName}</td>
                                        <td>{student['Roll No']}</td>
                                        <td>{student.enrollmentDate}</td>
                                        <td className={student.status === "Active" ? "active" : student.status === "Completed" ? "completed" : "pending1"}>
                                            {student.status}
                                        </td>
                                        <td>{student.contactInfo.email}</td>
                                        <td>{student.contactInfo.phone}</td>
                                        <td>
                                            {student.attendance.map((attendance, index) => (
                                                <div key={index}>
                                                    {attendance.date}: {attendance.status}
                                                </div>
                                            ))}
                                        </td>
                                        <td>{student.overallAttendanceScore}%</td>
                                        <td>{student.absentDates.join(", ")}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={currentPage === 1 ? "disabled" : "prev"}>Previous</button>
                <span className="total-pages">{`Page ${currentPage} of ${totalPages}`}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : "next"}>Next</button>
            </div>
        </div>
       
    );
}

export default Aptitude;
