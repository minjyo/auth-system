import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const AuthFormBlock = styled.div`
    display: flex;
    flex-direction: column;
    /* margin: auto; */
    align-items: center;
    padding: 1rem;
`;

const FormInput = styled.input`
    width: 500px;
    border: none;
    :focus {
        border-bottom: 2px solid ${palette.sgsOrange};
        outline: none;
    }
    background-color: #eeeeee;
    padding: 1rem;
    border-radius: 3px 3px 0 0;
    margin: 1rem 0;
`;

const AuthForm = ({ email, password, onChange }) => {
    return (
        <AuthFormBlock>
            <FormInput value={email} onChange={(e) => onChange({ key: "email", value: e.target.value })} />
            <FormInput value={password} onChange={(e) => onChange({ key: "password", value: e.target.value })} type="password" />
        </AuthFormBlock>
    );
};

export default AuthForm;
