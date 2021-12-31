import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
    const { logOut } = useAuth();

    useEffect(() => logOut(), []);

    return <h1>Loading...</h1>;
};

export default Logout;
