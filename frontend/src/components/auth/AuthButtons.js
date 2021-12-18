import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const AuthButtonsBlock = styled.div`
    display: flex;
    width: 530px;
    justify-content: space-between;
    padding-top: 3rem;
`;

const Button = styled.button`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: #eeeeee;
    font-weight: bold;
    width: 230px;
    height: 40px;
    border: none;
    outline: none;
    cursor: pointer;
    :hover {
        background: ${palette.sgsOrange};
        color: white;
    }
`;

const AuthButtons = ({ onLogin, onSign, email, password }) => {
    return (
        <>
            <AuthButtonsBlock>
                <Button onClick={() => onLogin({ email, password })}>로그인</Button>
                <Button onClick={() => onSign({ email, password })}>회원가입</Button>
            </AuthButtonsBlock>
        </>
    );
};

export default AuthButtons;
