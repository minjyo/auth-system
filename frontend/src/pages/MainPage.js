import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import styled from "styled-components";
import { getInfo, postIntro } from "../lib/api/user";
import palette from "../lib/styles/palette";

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

const Intro = styled.div`
    border-bottom: 1px solid ${palette.sgsOrange};
`;

const IntroInput = styled.input`
    width: 100px;
    border: none;
    border-bottom: 1px solid ${palette.sgsOrange};
    outline: none;
`;

const MainPage = () => {
    const navigate = useNavigate();

    const [intro, setIntro] = useState("");
    const [introInput, setIntroInput] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/auth");
        }
    });

    useEffect(() => {
        getInfo().then((info) => {
            setIntro(info.intro);
            if (info.role === true) {
                navigate("/admin");
            }
        });
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/auth");
    };

    return (
        <Wrapper>
            <Title>메인 페이지입니다.</Title>
            <Intro>{intro ? intro : "No Intro"}</Intro>
            <Button onClick={logout} text={"로그아웃"}></Button>
            <IntroInput value={intro} onChange={(e) => setIntroInput(e.target.value)}></IntroInput>
            <Button onClick={() => postIntro(introInput)} text={"자기소개 등록"}></Button>
        </Wrapper>
    );
};

export default MainPage;
