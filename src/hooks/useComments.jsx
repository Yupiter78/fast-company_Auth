import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { currentUser } = useAuth();
    const { userId } = useParams();

    useEffect(() => {
        getComments();
    }, [userId]);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            userId: currentUser._id,
            createdAt: Date.now()
        };

        try {
            const { content } = await commentService.createComment(comment);
            setComments((prev) => [content, ...prev]);
        } catch (err) {
            errorCatcher(err);
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId);
            setComments(content);
        } catch (err) {
            errorCatcher(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteComment(id) {
        try {
            const { content } = await commentService.deleteComment(id);
            if (content === null) {
                setComments((prev) => prev.filter((c) => c._id !== id));
            }
        } catch (err) {
            errorCatcher(err);
        }
    }

    function errorCatcher(error) {
        setError(error.message);
        setIsLoading(false);
    }

    return (
        <CommentsContext.Provider
            value={{ comments, createComment, getComments, deleteComment }}
        >
            {isLoading ? "Loading" : children}
        </CommentsContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
