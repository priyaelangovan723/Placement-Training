import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faFileCircleCheck, faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import '../Styles/Sidebar.css'

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth <= 1469;
            setIsMobile(mobileView);
            setIsOpen(!mobileView); // Always open if it's a desktop or large tablet
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    };

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
        if (isMobile) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isMobile && (
                <button className="toggle-btn" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                </button>
            )}

            <div className={`side-container ${isMobile && !isOpen ? "closed" : "open"}`}>
                <p id="dash"><b>Dashboard</b></p>
                <Link to="/dashboard/">
                    <div className={`dashboard ${selectedItem === 'dashboard' ? 'selected' : ''}`} onClick={() => handleItemClick('dashboard')}>
                        <div className="dashboard-heading"><p><b>Dashboard</b></p></div>
                    </div>
                </Link>

                <p id="dash"><b>Actions</b></p>
                <Link to="/dashboard/track-request">
                    <div className={`dashboard ${selectedItem === 'track request' ? 'selected' : ''}`} onClick={() => handleItemClick('track request')}>
                        <div className="dashboard-heading"><p><b>Track Request</b></p></div>
                        <FontAwesomeIcon className="logo2" icon={faFileCircleCheck} />
                    </div>
                </Link>

                <Link to="/dashboard/ongoing">
                    <div className={`dashboard ${selectedItem === 'ongoing' ? 'selected' : ''}`} onClick={() => handleItemClick('ongoing')}>
                        <div className="dashboard-heading"><p><b>Ongoing Training</b></p></div>
                        <FontAwesomeIcon className="logo2" icon={faChalkboardUser} />
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;
