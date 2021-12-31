import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (params) => {
        setFormType((prev) => (prev === "register" ? "login" : "register"));
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="offset-md-3 col-md-6 shadow p-3">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-3">Register</h3>
                            <RegisterForm />
                            <p>
                                Already have account?&nbsp;
                                <a role="button" onClick={toggleFormType}>
                                    Log in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-3">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?&nbsp;
                                <a role="button" onClick={toggleFormType}>
                                    Sign up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
