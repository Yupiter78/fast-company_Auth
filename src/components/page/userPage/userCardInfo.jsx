import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";

const UserCardInfo = ({ user }) => {
    const { currentUser } = useAuth();
    const { getProfession, isLoading: professionIsLoading } = useProfessions();
    const history = useHistory();

    const handleButton = () => {
        history.push(`/users/${user._id}/edit`);
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    {user._id === currentUser._id && (
                        <a
                            className="position-absolute top-0 end-0 btn btn-light btn-sm"
                            onClick={handleButton}
                        >
                            <i className="bi bi-gear" />
                        </a>
                    )}

                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                        alt="Face"
                    />

                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {!professionIsLoading &&
                                getProfession(user.profession)?.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            />
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            />
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCardInfo.propTypes = {
    user: PropTypes.object
};

export default UserCardInfo;
