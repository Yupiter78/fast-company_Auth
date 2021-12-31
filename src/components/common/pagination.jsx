import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({
    numberOfUsers,
    usersPerPage,
    currentPage,
    onPageChange
}) => {
    const numberOfPages = Math.ceil(numberOfUsers / usersPerPage);

    if (numberOfPages === 1) return null;

    const pageNumbers = _.range(1, numberOfPages + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pageNumbers.map((pageNumber) => {
                    return (
                        <li
                            key={pageNumber}
                            className={
                                "page-item" +
                                (pageNumber === currentPage ? " active" : "")
                            }
                        >
                            <button
                                className={"page-link"}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    numberOfUsers: PropTypes.number.isRequired,
    usersPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Pagination;
