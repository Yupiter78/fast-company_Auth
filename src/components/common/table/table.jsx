import React from "react";
import PropTypes from "prop-types";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, sortSet, onSort, children }) => {
    return (
        <table className="table table-hover">
            {children || (
                <>
                    <TableHeader {...{ columns, sortSet, onSort }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.object,
    sortSet: PropTypes.object,
    onSort: PropTypes.func,
    children: PropTypes.array
};

export default Table;
