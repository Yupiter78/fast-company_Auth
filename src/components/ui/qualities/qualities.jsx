import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const Qualities = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();

    if (isLoading) {
        return isLoading;
    }

    return (
        <>
            {qualities.map((id) => (
                <Quality key={id} {...getQuality(id)} />
            ))}
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualities;

const Quality = ({ name, color }) => {
    return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

Quality.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};
