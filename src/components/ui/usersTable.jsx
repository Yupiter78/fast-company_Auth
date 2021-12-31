import React from "react";
import PropTypes from "prop-types";

import Bookmark from "../common/bookmark";
import Qualities from "./qualities/qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({ users, onSort, sortSet, onBookmark }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            // eslint-disable-next-line react/display-name
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            // eslint-disable-next-line react/display-name
            component: (user) => <Qualities qualities={user.qualities} />
        },
        profession: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            // eslint-disable-next-line react/display-name
            component: (user) => (
                <Bookmark
                    status={user.bookmark}
                    onBookmark={() => onBookmark(user._id)}
                />
            )
        }
    };

    return (
        <Table {...{ data: users, columns, sortSet, onSort }} />
        // <Table>
        //   <TableHeader {...{columns, sortSet, onSort}}/>
        //   <TableBody {...{columns, data: users}}/>
        // </Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    sortSet: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default UsersTable;
