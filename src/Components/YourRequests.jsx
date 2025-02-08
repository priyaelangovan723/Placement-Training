import React, { useEffect } from "react";
import '../Styles/Dashboard.css';
import './YourRequests.css';

import { useUser } from './UserContext';
import { useLocation } from "react-router-dom";

const YourRequests = () => {
    const location = useLocation();
    const { state } = location;
    const { setEmail, setName } = useUser();

    useEffect(() => {
        if (state) {
            
            setEmail(state.email);
            setName(state.name);

            // Store state object in local storage
            localStorage.setItem('requestState', JSON.stringify(state));
            console.log(state)
        }
    }, [state, setEmail, setName]);

    // Retrieve state object from local storage
    const storedState = JSON.parse(localStorage.getItem('requestState')) || {};
    console.log("Stored State is ", storedState)
    const fileData = state && state.fileData

    return (
        <>
            <div className="content-container">
                <div className="table1-container">
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Duration in weeks</th>
                                <th>Industry Address Line1</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Postal Code</th>
                                <th>Country</th>
                                <th>IQAC Verification</th>
                                <th>Rewards Claimmed</th>
                                <th>Elective Chosen</th>
                                <th>Uploaded file</th>
                                {/* <th>Status</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{storedState.id}</td>
                                <td>{storedState.Student}</td>
                                <td>{storedState["Duration(in weeks)"]}</td>
                                <td>{storedState["Industry Address Line1"]}</td>
                                <td>{storedState.City}</td>
                                <td>{storedState.State}</td>
                                <td>{storedState["Postal Code"]}</td>
                                <td>{storedState.Country}</td>
                                <td>{storedState["IQAC Verification"]}</td>
                                <td>{storedState.rewards}</td>
                                <td>{storedState["elective chosen"]}</td>
                                <td>{storedState.fileData.name}</td>
                                {/* <td>{storedState.status}</td> */}
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default YourRequests;
