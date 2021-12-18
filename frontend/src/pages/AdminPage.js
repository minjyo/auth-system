import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserListContainer from "../containers/admin/UserListContainer";

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    return <UserListContainer />;
};

export default AdminPage;
