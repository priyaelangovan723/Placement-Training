import { useState } from "react";
import "./filter.css";
import * as XLSX from "xlsx";
import '../Styles/Dashboard.css';
// import "./AdminRequests.css";

const Filter = () => {
    const generateSampleStudents = () => {
        const names = ["John", "Jane", "Sam", "Alice", "Bob", "Mike", "Emma", "Olivia", "Ava", "Ethan", "Liam", "Noah"];
        const departments = ["CSE", "ISE", "ECE", "EEE", "MECH"];
        const batches = ["2025 - Fourth Year", "2026 - Third Year", "2027 - Second Year"];
        let sampleStudents = [];

        for (let i = 1; i <= 100; i++) {
            const name = `${names[Math.floor(Math.random() * names.length)]} ${names[Math.floor(Math.random() * names.length)]}`;
            const department = departments[Math.floor(Math.random() * departments.length)];
            const cgpa = (Math.random() * 2 + 7).toFixed(2); // CGPA between 7.00 and 9.99
            const rank = Math.floor(Math.random() * 100) + 1;
            const fullstackRank = Math.floor(Math.random() * 50) + 1;
            const batch = batches[Math.floor(Math.random() * batches.length)];
            sampleStudents.push({ id: i, name, department, cgpa, rank, fullstackRank, batch });
        }
        return sampleStudents;
    };

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedCGPA, setSelectedCGPA] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");
    const [selectedRankFilter, setSelectedRankFilter] = useState("");
    const [students, setStudents] = useState(generateSampleStudents);

    const departments = ["CSE", "ISE", "ECE", "EEE", "MECH"];
    const cgpaRanges = ["Above 9.5", "9.0 - 9.5", "8.5 - 9.0", "Below 8.5"];
    const batches = ["2025 - Fourth Year", "2026 - Third Year", "2027 - Second Year"];
    const rankFilters = ["Top 5", "Top 10", "Top 20", "Any Rank"];

    const filterStudents = students.filter((student) => {
        const departmentMatch = selectedDepartment ? student.department === selectedDepartment : true;
        const cgpaMatch = selectedCGPA
            ? (selectedCGPA === "Above 9.5" && student.cgpa > 9.5) ||
              (selectedCGPA === "9.0 - 9.5" && student.cgpa >= 9.0 && student.cgpa <= 9.5) ||
              (selectedCGPA === "8.5 - 9.0" && student.cgpa >= 8.5 && student.cgpa < 9.0) ||
              (selectedCGPA === "Below 8.5" && student.cgpa < 8.5)
            : true;
        const batchMatch = selectedBatch ? student.batch === selectedBatch : true;
        const rankMatch = selectedRankFilter
            ? (selectedRankFilter === "Top 5" && student.fullstackRank <= 5) ||
              (selectedRankFilter === "Top 10" && student.fullstackRank <= 10) ||
              (selectedRankFilter === "Top 20" && student.fullstackRank <= 20) ||
              (selectedRankFilter === "Any Rank")
            : true;

        return departmentMatch && cgpaMatch && batchMatch && rankMatch;
    });

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filterStudents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Students");
        XLSX.writeFile(workbook, "Filtered_Students_Report.xlsx");
    };

    const clearFilters = () => {
        setSelectedDepartment("");
        setSelectedCGPA("");
        setSelectedBatch("");
        setSelectedRankFilter("");
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(filterStudents.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div className="content-container">
            <div className="app-container">
                {/* Navbar */}
                <nav className="navbar">
                    <div className="navbar-title">Training & Placement Filter</div>
                    <div className="navbar-buttons">
                        <button onClick={downloadExcel} className="download-excel">
                            Download Report (Excel)
                        </button>
                        <button onClick={clearFilters} className="clear-filters">
                            Clear Filters
                        </button>
                    </div>
                </nav>

                {/* Filters Section */}
                <aside className="filters">
                    <div className="filter-item">
                        <label className="filter-label">Department</label>
                        <select className="filter-select" onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment}>
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">CGPA</label>
                        <select className="filter-select" onChange={(e) => setSelectedCGPA(e.target.value)} value={selectedCGPA}>
                            <option value="">Select CGPA Range</option>
                            {cgpaRanges.map((range) => (
                                <option key={range} value={range}>
                                    {range}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">Batch</label>
                        <select className="filter-select" onChange={(e) => setSelectedBatch(e.target.value)} value={selectedBatch}>
                            <option value="">Select Batch</option>
                            {batches.map((batch) => (
                                <option key={batch} value={batch}>
                                    {batch}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-item">
                        <label className="filter-label">Fullstack Rank</label>
                        <select className="filter-select" onChange={(e) => setSelectedRankFilter(e.target.value)} value={selectedRankFilter}>
                            <option value="">Select Rank Filter</option>
                            {rankFilters.map((rank) => (
                                <option key={rank} value={rank}>
                                    {rank}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Filtered Students Table */}
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>CGPA</th>
                                <th>Rank</th>
                                <th>Fullstack Rank</th>
                                <th>Batch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterStudents.slice(indexOfFirstItem, indexOfLastItem).map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.department}</td>
                                    <td>{student.cgpa}</td>
                                    <td>{student.rank}</td>
                                    <td>{student.fullstackRank}</td>
                                    <td>{student.batch}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Filter;
