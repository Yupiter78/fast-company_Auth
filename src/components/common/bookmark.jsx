import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, onBookmark }) => {
    return (
        <i
            className={`bi bi-bookmark${status ? "-fill" : ""}`}
            style={{
                fontSize: "1.5rem",
                color: `${status ? "" : "light"}green`
            }}
            onClick={onBookmark}
        />
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool,
    onBookmark: PropTypes.func
};

export default Bookmark;
