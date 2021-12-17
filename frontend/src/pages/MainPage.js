import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = ({ history }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    return <div>MAIN PAGE</div>;
};

export default MainPage;
