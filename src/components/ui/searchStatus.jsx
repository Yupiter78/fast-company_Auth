import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ numberOfUsers }) => {
    const renderPhrase = (number) => {
        if (number === 0) return "Никто с тобой не тусанет";
        if (number === 1) return "1 человек тусанет с тобой сегодня";
        return `${number} человек${letterA(number)} тусанут с тобой сегодня`;
    };

    const letterA = (number) => {
        const digits = number.toString().split("");
        if (digits[1] === "1") return "";
        if (["2", "3", "4"].includes(digits[0])) return "а";
        return "";
    };

    return (
        <h1>
            <span
                className={`badge bg-${numberOfUsers ? "primary" : "danger"}`}
            >
                {renderPhrase(numberOfUsers)}
            </span>
        </h1>
    );
};

SearchStatus.propTypes = {
    numberOfUsers: PropTypes.number.isRequired
};

export default SearchStatus;
