import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    return <div>AdminPage</div>;
};

export default AdminPage;
