import React from "react";
import PropTypes from "prop-types";
import { prepareDateForRender } from "../../../utils/prepareDateForRender";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({ comment, onDelete }) => {
    const { getUserById } = useUser();
    const { currentUser } = useAuth();

    const user = getUserById(comment.userId);
    const messageDate = prepareDateForRender(comment.createdAt, Date.now());

    return (
        <div className="bg-light card-body mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex flex-start">
                        <img
                            src={user.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                        <div className="flex-grow-1 flex-shrink-1">
                            <div className="mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1">
                                        {user.name}
                                        <span className="small ms-3">
                                            {messageDate}
                                        </span>
                                    </p>
                                    {currentUser._id === user._id && (
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() =>
                                                onDelete(comment._id)
                                            }
                                        >
                                            <i className="bi bi-x-lg" />
                                        </button>
                                    )}
                                </div>
                                <p className="small mb-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object,
    onDelete: PropTypes.func
};

export default Comment;
