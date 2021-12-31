import React from "react";
import PropTypes from "prop-types";
import Qualities from "./ui/qualities/qualities";
import Bookmark from "./common/bookmark";

const User = ({
    _id,
    name,
    profession,
    qualities,
    completedMeetings,
    rate,
    bookmark,
    onDelete,
    onBookmark
}) => {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>
                <Qualities qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{`${rate} /5`}</td>
            <td>
                <Bookmark
                    status={bookmark}
                    onBookmark={() => onBookmark(_id)}
                />
            </td>
            <td>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => onDelete(_id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profession: PropTypes.object.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default User;
