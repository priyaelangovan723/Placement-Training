import { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from "chart.js";
import "../../Styles/Analytics.css";
import * as XLSX from "xlsx";
import "../../Styles/TrackRequest.css"

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Analytics = () => {
    const [filters, setFilters] = useState({
        period: "Weekly",
        department: "All Departments",
        status: "All",
        search: "",
    });

    const allTrainings = [
        { name: "Comm Skills", type: "Internal", department: "EEE", dates: "2025-01-01", trainer: "John Doe", status: "Completed" },
        { name: "Circuit Design", type: "External", department: "EEE", dates: "2025-02-10", trainer: "Jane Smith", status: "In Progress" },
        { name: "Data Structures", type: "Internal", department: "CSE", dates: "2025-03-15", trainer: "Alice Brown", status: "Completed" },
        { name: "Machine Learning", type: "External", department: "CSE", dates: "2025-04-05", trainer: "Bob White", status: "In Progress" },
        { name: "Power Systems", type: "Internal", department: "EEE", dates: "2024-12-22", trainer: "Charlie Green", status: "Completed" },
        { name: "Web Development", type: "External", department: "CSE", dates: "2024-06-30", trainer: "Eve Black", status: "Completed" },
        { name: "Database Management", type: "Internal", department: "IT", dates: "2024-07-15", trainer: "Daniel Gray", status: "In Progress" },
        { name: "AI Fundamentals", type: "External", department: "AIML", dates: "2024-08-20", trainer: "Sophia Lane", status: "Completed" },
        { name: "Cyber Security", type: "Internal", department: "ISE", dates: "2024-09-10", trainer: "David Fox", status: "In Progress" },
        { name: "Cloud Computing", type: "External", department: "CT", dates: "2024-10-25", trainer: "Ivy Watson", status: "Completed" },
        { name: "IoT Basics", type: "Internal", department: "CSBS", dates: "2024-11-05", trainer: "Sam White", status: "In Progress" },
        { name: "Blockchain", type: "External", department: "AIDS", dates: "2024-12-15", trainer: "Lisa Brown", status: "Completed" },
        { name: "Full Stack Development", type: "Internal", department: "CSD", dates: "2024-12-22", trainer: "Mark Black", status: "In Progress" },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const trainingsPerPage = 5;

    const filterByPeriod = (trainings, period) => {
        const now = new Date();
        let periodStart = new Date();

        if (period === "Weekly") {
            periodStart.setDate(now.getDate() - 7);
        } else if (period === "Monthly") {
            periodStart.setMonth(now.getMonth() - 1);
        } else if (period === "Yearly") {
            periodStart.setFullYear(now.getFullYear() - 1);
        }

        return trainings.filter((training) => {
            const trainingDate = new Date(training.dates);
            return trainingDate >= periodStart;
        });
    };

    const filteredTrainings = filterByPeriod(allTrainings, filters.period).filter((training) => {
        return (
            (filters.department === "All Departments" || training.department === filters.department) &&
            (filters.status === "All" || training.status === filters.status) &&
            (filters.search === "" || training.name.toLowerCase().includes(filters.search.toLowerCase()))
        );
    });

    const indexOfLastTraining = currentPage * trainingsPerPage;
    const indexOfFirstTraining = indexOfLastTraining - trainingsPerPage;
    const currentTrainings = filteredTrainings.slice(indexOfFirstTraining, indexOfLastTraining);
    const totalPages = Math.ceil(filteredTrainings.length / trainingsPerPage);

    // Data for the bar chart (Department-wise)
    const barChartData = {
        labels: ["EEE", "CSE", "IT", "ISE", "CSBS", "CT", "AIDS", "AIML", "CSD"], // Departments
        datasets: [
            {
                label: "Trainings by Department",
                data: [
                    allTrainings.filter(t => t.department === "EEE").length,
                    allTrainings.filter(t => t.department === "CSE").length,
                    allTrainings.filter(t => t.department === "IT").length,
                    allTrainings.filter(t => t.department === "ISE").length,
                    allTrainings.filter(t => t.department === "CSBS").length,
                    allTrainings.filter(t => t.department === "CT").length,
                    allTrainings.filter(t => t.department === "AIDS").length,
                    allTrainings.filter(t => t.department === "AIML").length,
                    allTrainings.filter(t => t.department === "CSD").length,
                ],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                    "#FFCD56",
                    "#4BC0C0",
                ],
                borderColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                    "#FFCD56",
                    "#4BC0C0",
                ],
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows custom height
        scales: {
            x: {
                barPercentage: 0.4, // Reduce the bar width (default is 0.9)
                categoryPercentage: 0.5, // Adjusts space between bars
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    // Data for the pie chart (Internal vs External Trainings)
    const pieChartData = {
        labels: ["Internal", "External"], // Labels for Internal and External trainings
        datasets: [
            {
                label: "Trainings by Type",
                data: [
                    allTrainings.filter(t => t.type === "Internal").length, // Count of Internal trainings
                    allTrainings.filter(t => t.type === "External").length, // Count of External trainings
                ],
                backgroundColor: [
                    "#FF6384", // Color for Internal
                    "#36A2EB", // Color for External
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                ],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows setting custom height
        plugins: {
            legend: {
                position: "top", // Adjust legend position
            },
        },
    };

    // Data for the student performance line chart
    const studentPerformanceData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // Months
        datasets: [
            {
                label: "Student Performance (%)",
                data: [65, 70, 75, 80, 85, 90, 88, 92, 95, 98, 96, 99], // Example performance data
                borderColor: "#4BC0C0", // Line color
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
                borderWidth: 2,
                pointRadius: 5,
                pointBackgroundColor: "#4BC0C0",
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Months",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Performance (%)",
                },
                beginAtZero: true,
                max: 100,
            },
        },
    };
    const generateExcelReport = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredTrainings);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Trainings Report");
        XLSX.writeFile(workbook, "Trainings_Report.xlsx");
    };

    return (
        <div className="content-container">


            {/* Page Title */}
            <h1 >Training Reports</h1>

            {/* Summary Cards */}
            <div className="summary-cards">
                {[
                    { title: "Total Conducted", value: `${allTrainings.length} Trainings` },
                    { title: "In Progress", value: `${allTrainings.filter(t => t.status === "In Progress").length} Trainings` },
                    { title: "Completed", value: `${allTrainings.filter(t => t.status === "Completed").length} Trainings` },
                ].map((card, index) => (
                    <div className="summary-card" key={index}>
                        <h3>{card.title}</h3>
                        <p>{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="filters-container">
                <select value={filters.period} onChange={(e) => setFilters({ ...filters, period: e.target.value })}>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                </select>

                <select value={filters.department} onChange={(e) => setFilters({ ...filters, department: e.target.value })}>
                    <option value="All Departments">All Departments</option>
                    <option value="EEE">EEE</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ISE">ISE</option>
                    <option value="CSBS">CSBS</option>
                    <option value="CT">CT</option>
                    <option value="AIDS">AIDS</option>
                    <option value="AIML">AIML</option>
                    <option value="CSD">CSD</option>
                </select>

                <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                </select>

                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />

                <button className="apply-button" onClick={generateExcelReport}>Generate Report</button>
            </div>

            <div className="table-wrapper">
                <div className="training-table-container">
                    <table className="training-table">
                        <thead>
                            <tr>
                                {["Training Name", "Type", "Department", "Dates", "Trainer", "Status"].map((head, index) => (
                                    <th key={index}>{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentTrainings.length > 0 ? (
                                currentTrainings.map((training, index) => (
                                    <tr key={index}>
                                        <td>{training.name}</td>
                                        <td>{training.type}</td>
                                        <td>{training.department}</td>
                                        <td>{training.dates}</td>
                                        <td>{training.trainer}</td>
                                        <td>{training.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                                        No matching trainings found
                                    </td>
                                </tr>
                            )}
                            {/* Pagination Controls */}




                        </tbody>

                    </table>

                </div>
                <div className="pagination">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        Prev
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
                </div>

            </div>




            {/* Charts Section */}
            <div className="charts-container">
                <div className="chart">
                    <h3>Trainings by Department</h3>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
                <div className="chart">
                    <h3>Trainings by Type (Internal vs External)</h3>
                    <Pie data={pieChartData} options={pieChartOptions} />
                </div>
                <div className="chart">
                    <h3>Student Performance Over Time</h3>
                    <Line data={studentPerformanceData} options={lineChartOptions} />
                </div>
            </div>
        </div>
    );
}

export default Analytics;