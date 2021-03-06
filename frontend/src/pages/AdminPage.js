import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserListContainer from "../containers/admin/UserListContainer";
import Button from "../components/common/Button";
import { isAdmin } from "../lib/api/user";

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    useEffect(() => {
        isAdmin().then((res) => {
            console.log(res);
            if (!res) {
                navigate("/");
            }
        });
    });

    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/auth");
    };

    return (
        <div>
            <UserListContainer />
            <Button onClick={logout} text={"๋ก๊ทธ์์"}></Button>
        </div>
    );
};

export default AdminPage;
