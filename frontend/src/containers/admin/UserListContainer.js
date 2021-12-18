import React, { useEffect, useState } from "react";
import UserList from "../../components/admin/UserList";
import { getUsers, deleteUser, setAdmin } from "../../lib/api/admin";

const UserListContainer = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res);
        });
    }, []);

    return (
        <>
            <UserList onDelete={deleteUser} onAdmin={setAdmin} users={users}></UserList>
        </>
    );
};

export default UserListContainer;
