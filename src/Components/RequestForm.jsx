import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./RequestForm.css";
import { Link } from "react-router-dom";

const RequestForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ID: 105,
        Title: "",
        Resource: "",
        Domain: " ",
        Technical: " ",
        Year: " ",
        "Start Date": "",
        "End Date": "",
        Description: "",
        "Training Status": "",
        "Trainer ID": "",
        Duration: 0,
        Assessments: " ",
        "Apex Details": "",
        "Venue Details": "",
        "Submitted On": "4/25/2024, 8:15:00 AM", // Fixed timestamp
        "Request Status": "",
        Remarks: "",
        View: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
        setErrors((prevState) => ({ ...prevState, [name]: "" }));
        console.log("fOrm Data updated");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit Button clicked");
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== "Remarks" && key !== "View" && key !== "Training Status" && key !== "Request Status" && !(key === "Apex Details" && formData["Resource"] === "Inside BIT")) {
                newErrors[key] = `${key} is required.`;
            }
        });
        console.log("Validation errors:", newErrors);
        if (Object.keys(newErrors).length > 0) {
            setErrors({ ...newErrors });
            console.log("Errors set:", newErrors);
            return;
        }

        console.log("Form Data Submitted:", formData);

        // Navigate to another page with the submitted data
        navigate("/dashboard/track-request");
    };

    return (
        <div className="color-container">
            <div className="form-container">
                <h1>Training Request Form</h1>
                <form onSubmit={handleSubmit}>
                    <table className="form-table">
                        <tbody>
                            <tr>
                                <td className="label-cell">Title</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Title"
                                        value={formData.Title}
                                        onChange={handleChange}
                                        className="form-select"
                                    />
                                    {errors.Title && <div className="error">{errors.Title}</div>}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Resource</td>
                                <td>
                                    <select
                                        name="Resource"
                                        value={formData["Resource"]}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Inside BIT">Inside BIT</option>
                                        <option value="Outside BIT">Outside BIT </option>
                                    </select>
                                    {errors.Resource && (
                                        <div className="error">{errors.Resource}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Domain</td>
                                <td>
                                    <select
                                        name="Domain"
                                        value={formData["Domain"]}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Aptitude">Aptitude</option>
                                        <option value="Verbal">Verbal</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Mock Interview">Mock Interview</option>
                                    </select>
                                    {errors.Domain && (
                                        <div className="error">{errors.Domain}</div>
                                    )}
                                </td>
                            </tr>
                            {formData.Domain === "Technical" && (

                                <tr>
                                    <td className="label-cell">Technical Content</td>
                                    <td>
                                        <select
                                            name="Technical"
                                            value={formData["Technical"]}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="">Select</option>
                                            <option value="OOPS">OOPS</option>
                                            <option value="C">C Programming</option>
                                            <option value="C++">C++</option>
                                            <option value="JAVA">JAVA</option>
                                            <option value="Python">Python</option>
                                            <option value="DBMS">DBMS</option>
                                            <option value="DSA">DSA</option>
                                            <option value="Debugging">Debugging</option>
                                        </select>
                                        {errors.Technical && (
                                            <div className="error">{errors.Technical}</div>
                                        )}
                                    </td>
                                </tr>

                            )}
                            <tr>
                                <td className="label-cell">Year</td>
                                <td>
                                    <select
                                        name="Year"
                                        value={formData["Year"]}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="I Year">I Year</option>
                                        <option value="II Year">II Year</option>
                                        <option value="III Year">III Year</option>
                                        <option value="IV Year">IV Year</option>
                                    </select>
                                    {errors.Year && (
                                        <div className="error">{errors.Year}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Start Date</td>
                                <td>
                                    <input
                                        type="date"
                                        name="Start Date"
                                        value={formData["Start Date"]}
                                        onChange={handleChange}
                                        className="form-date"
                                    />
                                    {errors["Start Date"] && (
                                        <div className="error">{errors["Start Date"]}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">End Date</td>
                                <td>
                                    <input
                                        type="date"
                                        name="End Date"
                                        value={formData["End Date"]}
                                        onChange={handleChange}
                                        className="form-date"
                                    />
                                    {errors["End Date"] && (
                                        <div className="error">{errors["End Date"]}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Description</td>
                                <td>
                                    <textarea
                                        name="Description"
                                        value={formData.Description}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors.Description && (
                                        <div className="error">{errors.Description}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Assessments</td>
                                <td>
                                    <select
                                        name="Assessments"
                                        value={formData["Assessments"]}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Inside BIT">Internal</option>
                                        <option value="Outside BIT">External </option>
                                    </select>
                                    {errors.Assessments && (
                                        <div className="error">{errors.Assessments}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Trainer ID</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Trainer ID"
                                        value={formData["Trainer ID"]}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors["Trainer ID"] && (
                                        <div className="error">{errors["Trainer ID"]}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Duration(in days)</td>
                                <td>
                                    <input
                                        type="number"
                                        name="Duration"
                                        value={formData.Duration}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors.Duration && (
                                        <div className="error">{errors.Duration}</div>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="label-cell">Venue Details</td>
                                <td>
                                    <input
                                        type="text"
                                        name="Venue Details"
                                        value={formData["Venue Details"]}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                    {errors["Venue Details"] && (
                                        <div className="error">{errors["Venue Details"]}</div>
                                    )}
                                </td>
                            </tr>
                            {formData.Resource === "Outside BIT" && (

                                <tr>
                                    <td className="label-cell">Vendor Name</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="Vendor Name"
                                            value={formData["Vendor Name"]}
                                            onChange={handleChange}
                                            className="form-input"

                                        />
                                        {errors["Vendor Name"] && (
                                            <div className="error">{errors["Vendor Name"]}</div>
                                        )}
                                    </td>
                                </tr>

                            )}
                            {formData.Resource === "Outside BIT" && (

                                <tr>
                                    <td className="label-cell">Apex Details</td>
                                    <td>
                                        <input
                                            type="file"
                                            name="Apex Details"
                                            accept="application/pdf"
                                            onChange={handleChange}
                                            

                                        />
                                        {errors["Apex Details"] && (
                                            <div className="error">{errors["Apex Details"]}</div>
                                        )}
                                    </td>
                                </tr>

                            )}


                        </tbody>
                    </table>
                    <div>

                        <button type="submit" className="form-btn"  >
                            Submit Request
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default RequestForm;
