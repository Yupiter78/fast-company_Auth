import React from "react";
import PropTypes from "prop-types";

import UserCardInfo from "./userCardInfo";
import UserCardQualities from "./userCardQualities";
import UserCardMeetings from "./userCardMeetings";

const UserCard = ({ user }) => {
    return (
        <div className="col-md-4 mb-3">
            <UserCardInfo user={user} />

            <UserCardQualities qualities={user.qualities} />

            <UserCardMeetings completedMeetings={user.completedMeetings} />
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object,
    onClickButton: PropTypes.func
};

export default UserCard;
