import React from "react";
import PropTypes from "prop-types";

const CheckboxField = ({ name, value, onChange, children, error }) => {
    const handleChange = (event) => {
        onChange({ name: name, value: !value });
    };

    const inputClasses = "form-check-input" + (error ? " is-invalid" : "");

    return (
        <div className="form-check mb-4">
            <input
                checked={value}
                className={inputClasses}
                type="checkbox"
                value=""
                id={name}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckboxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};

export default CheckboxField;
