import React, { useEffect, useState } from "react";
import _ from "lodash";

import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const usersPerPage = 8;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "rate", order: "acs" });
    const [search, setSearch] = useState("");

    const { users: allUsers } = useUser();
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { currentUser } = useAuth();

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, search]);

    if (!allUsers) return <h3>Loading...</h3>;

    const handleBookmark = (userId) => {
        const newArray = allUsers.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // =========================
        console.log("newArray:", newArray);
        // =========================
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };

    const handleSort = (sortSet) => {
        setSortBy(sortSet);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setSelectedProf();
    };

    const clearFilter = () => {
        setSelectedProf();
        setSearch("");
    };

    const filterUsers = () => {
        const users = allUsers.filter((user) => user._id !== currentUser._id);

        if (selectedProf) {
            return users.filter((user) => user.profession === selectedProf._id);
        }
        if (search) {
            return users.filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        return users;
    };

    const filteredUsers = filterUsers();

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const usersOfPage = paginate(sortedUsers, currentPage, usersPerPage);

    const numberOfUsers = filteredUsers.length;

    if (currentPage > 1 && currentPage >= numberOfUsers / usersPerPage + 1) {
        setCurrentPage(Math.floor(numberOfUsers / usersPerPage));
    }

    return (
        <div className="d-flex">
            {professions && !professionsLoading && (
                <div className="d-flex flex-column flex-lg-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus numberOfUsers={numberOfUsers} />
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    className="form-control"
                    placeholder="Search..."
                />
                {numberOfUsers > 0 && (
                    <UsersTable
                        users={usersOfPage}
                        onSort={handleSort}
                        sortSet={sortBy}
                        onBookmark={handleBookmark}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        numberOfUsers={numberOfUsers}
                        usersPerPage={usersPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
