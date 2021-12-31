import React from "react";
import PropTypes from "prop-types";

import Comment from "./comment";
import { useComments } from "../../../hooks/useComments";

const CommentsList = () => {
    const { comments, deleteComment } = useComments();

    const handleDelete = (id) => {
        deleteComment(id);
    };

    const sortedComments = comments?.sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr />

                {sortedComments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentsList;
