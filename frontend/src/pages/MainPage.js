import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Title = styled.div`
    font-size: 25px;
    margin: 2rem;
`;

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/auth");
    };

    return (
        <Wrapper>
            <Title>메인 페이지입니다.</Title>
            <Button onClick={logout} text={"로그아웃"}></Button>
        </Wrapper>
    );
};

export default MainPage;
