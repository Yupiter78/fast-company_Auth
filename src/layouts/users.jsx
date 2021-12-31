import React from "react";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId } = useParams();

    return (
        <UserProvider>
            {userId ? <UserPage userId={userId} /> : <UsersListPage />}
        </UserProvider>
    );
};

export default Users;
