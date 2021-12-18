import React, { useEffect, useState } from "react";
import UserList from "../../components/admin/UserList";
import { getUsers } from "../../lib/api/user";

const UserListContainer = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        getUsers().then((res) => {
            setUsers(res);
        });
    }, []);

    return (
        <>
            <UserList users={users}></UserList>
        </>
    );
};

export default UserListContainer;
