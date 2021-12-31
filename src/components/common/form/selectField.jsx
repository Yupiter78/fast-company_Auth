import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((i) => ({
                  label: options[i].label,
                  value: options[i].value
              }))
            : options;

    const handleChange = (event) => {
        onChange({ name: event.target.name, value: event.target.value });
    };

    const inputClasses = "form-select" + (error ? " is-invalid" : "");

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                name="profession"
                value={value}
                onChange={handleChange}
                className={inputClasses}
                id="validationCustom04"
                required
            >
                <option value="" disabled>
                    {defaultOption}
                </option>

                {optionsArray &&
                    optionsArray.map((i) => (
                        <option key={i.value} value={i.value}>
                            {i.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};

export default SelectField;
