import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);

    const history = useHistory();
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setCurrentUser(content);
        } catch (err) {
            errorCatcher(err);
        }
    }

    useEffect(() => {
        if (localStorageService.getUserId()) {
            getUserData();
        }
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function singUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            localStorageService.setToken(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (err) {
            errorCatcher(err);
            const { code, message } = err.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                        email: "Пользователь с таким EMAIL уже существует"
                    };
                }
            }
            // =========================
            console.log("err.response.data.error:", err.response.data.error);
            // =========================
        }
    }

    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                { email, password, returnSecureToken: true }
            );
            localStorageService.setToken(data);
            await getUserData();
        } catch (err) {
            errorCatcher(err);
            const { code, message } = err.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    throw new Error("Неверный пароль");
                } else if (message === "EMAIL_NOT_FOUND") {
                    throw new Error("Пользователь с таким EMAIL не найден");
                } else {
                    throw new Error(
                        "Пароль введен много раз. Попробуйте позже"
                    );
                }
            }
            // =========================
            console.log("err.response.data.error:", err.response.data.error);
            // =========================
        }
    }

    async function logOut() {
        localStorageService.removeAuthData();
        setCurrentUser(null);
        history.push("/");
    }

    async function update(email, password, userData) {
        try {
            const { data } = await httpAuth.post("accounts:update", {
                idToken: localStorageService.getAccessToken(),
                email,
                password,
                returnSecureToken: true
            });

            localStorageService.setToken(data);

            await updateUser(data.localId, {
                email,
                ...userData
            });

            await getUserData();
        } catch (err) {
            const { code, message } = err.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким EMAIL уже существует"
                    };
                    throw errorObject;
                }
                // else if (message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN') {
                //   throw new Error('Учетные данные устарели. Войдите в систему снова!')
                // }
            }
            errorCatcher(err);
        }
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setCurrentUser(content);
        } catch (err) {
            errorCatcher(err);
        }
    }

    async function updateUser(id, data) {
        try {
            const { content } = await userService.update(id, data);
            setCurrentUser(content);
        } catch (err) {
            errorCatcher(err);
        }
    }

    function errorCatcher(err) {
        setError(err.response?.data?.error?.message || err.message);
    }

    return (
        <AuthContext.Provider
            value={{ singUp, logIn, logOut, update, currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
