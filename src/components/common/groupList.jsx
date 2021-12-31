import React from "react";
import PropTypes, { oneOfType } from "prop-types";

const GroupList = ({
    selectedItem,
    items,
    valueProperty = "_id",
    contentProperty = "name",
    onItemSelect
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((key) => (
                <li
                    key={items[key][valueProperty]}
                    className={
                        "list-group-item" +
                        (items[key] === selectedItem ? " active" : "")
                    }
                    role="button"
                    onClick={() => onItemSelect(items[key])}
                >
                    {items[key][contentProperty]}
                </li>
            ))}
        </ul>
    );
};

// GroupList.defaultProps = {
//   valueProperty: '_id',
//   contentProperty: 'name'
// }

GroupList.propTypes = {
    selectedItem: PropTypes.object,
    items: oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onItemSelect: PropTypes.func.isRequired
};

export default GroupList;
