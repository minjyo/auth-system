import React, { useEffect } from "react";
import AuthFormContainer from "../containers/auth/AuthFormContainer";
import palette from "../lib/styles/palette";
import styled from "styled-components";

const PageWrapper = styled.div`
    background: ${palette.sgsOrange};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const AuthWrapper = styled.div`
    background: white;
    border-radius: 3px;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40%;
`;

const AuthPage = ({ history }) => {
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            history.push("/");
        }
    });

    return (
        <PageWrapper>
            <AuthWrapper>
                <AuthFormContainer />
            </AuthWrapper>
        </PageWrapper>
    );
};

export default AuthPage;
