import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ name, label, options, value, onChange }) => {
    const handleChange = (event) => {
        onChange({ name: event.target.name, value: event.target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>

            <div>
                {options.map((i) => (
                    <div
                        key={i.name + "_" + i.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            name={name}
                            value={i.value}
                            id={i.name + "_" + i.value}
                            checked={i.value === value}
                            onChange={handleChange}
                            className="form-check-input"
                            type="radio"
                        />
                        <label
                            htmlFor={i.name + "_" + i.value}
                            className="form-check-label"
                        >
                            {i.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default RadioField;
