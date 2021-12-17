import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import palette from "../../lib/styles/palette";
import AuthButtons from "../../components/auth/AuthButtons";
import { login, sign } from "../../lib/api/auth";

const AuthFormContainer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (field) => {
        if (field.key === "email") {
            setEmail(field.value);
        } else {
            setPassword(field.value);
        }
    };

    return (
        <>
            <AuthForm email={email} password={password} onChange={onChange}></AuthForm>
            <AuthButtons onLogin={login} onSign={sign} email={email} password={password}></AuthButtons>
        </>
    );
};

export default AuthFormContainer;
