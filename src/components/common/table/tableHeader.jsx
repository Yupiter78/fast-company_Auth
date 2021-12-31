import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ columns, sortSet, onSort }) => {
    const handleSort = (path) => {
        if (sortSet.path === path) {
            onSort({
                ...sortSet,
                order: sortSet.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path, order: "asc" });
        }
    };

    const showSortSign = (path) => {
        if (path === sortSet.path) {
            return sortSet.order === "asc" ? (
                <i className="bi bi-caret-up-fill" />
            ) : (
                <i className="bi bi-caret-down-fill" />
            );
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((key) => (
                    <th
                        key={key}
                        scope="col"
                        onClick={
                            columns[key].path &&
                            (() => handleSort(columns[key].path))
                        }
                        {...(columns[key].path && { role: "button" })}
                    >
                        {columns[key].name}
                        {showSortSign(columns[key].path)}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    columns: PropTypes.object.isRequired,
    sortSet: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default TableHeader;
