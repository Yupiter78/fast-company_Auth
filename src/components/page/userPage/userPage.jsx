import React from "react";
import PropTypes from "prop-types";

import UserCard from "./userCard";
import CommentsList from "./commentsList";
import CommentForm from "./commentForm";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();

    const user = getUserById(userId);

    if (!user) return <h3>Loading....</h3>;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <UserCard user={user} />

                <CommentsProvider>
                    <div className="col-md-8">
                        <CommentForm />

                        <CommentsList />
                    </div>
                </CommentsProvider>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
