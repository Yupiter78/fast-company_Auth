import React from "react";
import PropTypes from "prop-types";
import useMockData from "../utils/mockData";

const Main = ({ isAdmin }) => {
    const { error, initialize, progress, status } = useMockData();

    const handleClick = () => {
        // =========================
        console.log("clicked");
        // =========================
        initialize();
    };
    return (
        <div className="container mt-5">
            <h1>Main</h1>
            <h3>Инициализация данных в Firebase</h3>
            <button className="btn btn-outline-primary" onClick={handleClick}>
                Инициализировать
            </button>
            <ul>
                <li>Status: {status}</li>
                <li>Progress: {progress}</li>
                {error && <li>Error: {error}</li>}
            </ul>
        </div>
    );
};

Main.propTypes = {
    isAdmin: PropTypes.bool
};

export default Main;
