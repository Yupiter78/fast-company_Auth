import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, name, onChange, label, value }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((i) => ({
                  label: options[i].name,
                  value: options[i]._id
              }))
            : options;

    const handleChange = (field) => {
        onChange({ name: name, value: field });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                defaultValue={value}
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func
    // error: PropTypes.string
};
export default MultiSelectField;
